import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import ForgotPassword from '../pages/ForgotPassword';
import sendForgotOtp from '../services/sendOtpService';
import { toast } from 'react-toastify';
import axios from 'axios';
const mockedAxios = axios as unknown as {
  isAxiosError: jest.Mock;
};

/* -------------------- MOCKS -------------------- */

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../services/sendOtpService', () => jest.fn());

jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

/* -------------------- RENDER HELPER -------------------- */

const renderPage = () =>
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

/* -------------------- TEST CASES -------------------- */

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders forgot password page', () => {
    renderPage();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send otp/i })
    ).toBeInTheDocument();
  });

  test('shows error when clicking send OTP without email', async () => {
    renderPage();

    await userEvent.click(
      screen.getByRole('button', { name: /send otp/i })
    );

    expect(toast.error).toHaveBeenCalledWith(
      'Please enter a valid email'
    );
  });

  test('sends OTP and shows success message', async () => {
    (sendForgotOtp as jest.Mock).mockResolvedValueOnce({});

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /send otp/i })
    );

    await waitFor(() => {
      expect(sendForgotOtp).toHaveBeenCalledWith('test@example.com');
      expect(toast.success).toHaveBeenCalledWith(
        'OTP sent to your Email'
      );
    });
  });

  test('shows backend error message on axios error', async () => {
    (sendForgotOtp as jest.Mock).mockRejectedValueOnce({
      response: {
        data: { message: 'User not found' },
      },
    });

mockedAxios.isAxiosError.mockReturnValue(true);

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /send otp/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User not found');
    });
  });

  test('shows generic error for non-axios error', async () => {
    (sendForgotOtp as jest.Mock).mockRejectedValueOnce(
      new Error('Something went wrong')
    );

mockedAxios.isAxiosError.mockReturnValue(true);

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /send otp/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error sending OTP'
      );
    });
  });
});
