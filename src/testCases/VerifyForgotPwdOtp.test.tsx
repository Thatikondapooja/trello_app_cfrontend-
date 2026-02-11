import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import VerifyForgotOtp from '../pages/VarifyForgotOtp';
import VerifyForgotOtps from '../services/verifyForgotOtpService';
import { toast } from 'react-toastify';
import axios from 'axios';

/* ---------------- MOCKS ---------------- */

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../services/verifyForgotOtpService', () => jest.fn());

jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

/* ---------------- RENDER HELPER ---------------- */

const renderPage = () =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/verify',
          state: { email: 'test@example.com' },
        } as any,
      ]}
    >
      <VerifyForgotOtp />
    </MemoryRouter>
  );

/* ---------------- TESTS ---------------- */

describe('VerifyForgotOtp Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders verify OTP page', () => {
    renderPage();

    expect(screen.getByLabelText(/enter otp/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /verify otp/i })
    ).toBeInTheDocument();
  });

  /*  SUCCESS CASE */
  test('verifies OTP successfully', async () => {
    (VerifyForgotOtps as jest.Mock).mockResolvedValueOnce({});

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/enter otp/i),
      '123456'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /verify otp/i })
    );

    await waitFor(() => {
      expect(VerifyForgotOtps).toHaveBeenCalledWith(
        'test@example.com',
        '123456'
      );

      expect(toast.success).toHaveBeenCalledWith('OTP Verified');
    });
  });

  /* AXIOS ERROR CASE */
  test('shows backend error message for axios error', async () => {
    (VerifyForgotOtps as jest.Mock).mockRejectedValueOnce({
      response: {
        data: { message: 'Wrong OTP' },
      },
    });

    (axios as any).isAxiosError = jest.fn().mockReturnValue(true);

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/enter otp/i),
      '000000'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /verify otp/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Wrong OTP');
    });
  });

  /* GENERIC ERROR CASE */
  test('shows generic error when not axios error', async () => {
    (VerifyForgotOtps as jest.Mock).mockRejectedValueOnce(
      new Error('Something went wrong')
    );

    (axios as any).isAxiosError = jest.fn().mockReturnValue(false);

    renderPage();

    await userEvent.type(
      screen.getByLabelText(/enter otp/i),
      '000000'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /verify otp/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid OTP');
    });
  });
});
