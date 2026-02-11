// import '@testing-library/jest-dom';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';

// import { toast } from 'react-toastify';
// import axios from 'axios';
// import ResetPassword from '../pages/ResetPassword';
// import resetPassword from '../services/resetPwdService';

// /* ---------------- MOCKS ---------------- */

// jest.mock('react-toastify', () => ({
//   toast: {
//     error: jest.fn(),
//     success: jest.fn(),
//   },
// }));

// jest.mock('../services/resetPwdService', () => jest.fn());

// jest.mock('axios', () => ({
//   isAxiosError: jest.fn(),
// }));

// /* ---------------- RENDER HELPER ---------------- */

// const renderPage = () =>
//   render(
//     <MemoryRouter
//       initialEntries={[
//         {
//           pathname: '/reset-password',
//           state: { email: 'test@example.com' },
//         } as any,
//       ]}
//     >
//       <ResetPassword/>
//     </MemoryRouter>
//   );

// /* ---------------- TESTS ---------------- */

// describe('ResetPassword Page', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders reset password page', () => {
//     renderPage();

//     expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
//     expect(
//       screen.getByRole('button', { name: /Update Password/i })
//     ).toBeInTheDocument();
//   });

//   /*  SUCCESS CASE */
//   test('verifies OTP successfully', async () => {
//     (resetPassword as jest.Mock).mockResolvedValueOnce({});

//     renderPage();

//     await userEvent.type(
//       screen.getByLabelText(/New Password/i),
//       '123456'
//     );

//     await userEvent.click(
//       screen.getByRole('button', { name: /Update Password/i })
//     );

//     await waitFor(() => {
//       expect(resetPassword).toHaveBeenCalledWith(
//         'test@example.com',
//         '123456'
//       );

//       expect(toast.success).toHaveBeenCalledWith('Password Reset Successfully');
//     });
//   });

//   /* AXIOS ERROR CASE */
//   test('shows backend error message for axios error', async () => {
//     (resetPassword as jest.Mock).mockRejectedValueOnce({
//       response: {
//         data: { message: 'Wrong OTP' },
//       },
//     });

//     (axios as any).isAxiosError = jest.fn().mockReturnValue(true);

//     renderPage();

//     await userEvent.type(
//       screen.getByLabelText(/New Password/i),
//       '000000'
//     );

//     await userEvent.click(
//       screen.getByRole('button', { name: /Update Password/i })
//     );

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Wrong OTP');
//     });
//   });

//   /* GENERIC ERROR CASE */
//   test('shows generic error when not axios error', async () => {
//     (resetPassword as jest.Mock).mockRejectedValueOnce(
//       new Error('Something went wrong')
//     );

//     (axios as any).isAxiosError = jest.fn().mockReturnValue(false);

//     renderPage();

//     await userEvent.type(
//       screen.getByLabelText(/New Password/i),
//       '000000'
//     );

//     await userEvent.click(
//       screen.getByRole('button', { name: /Update Password/i })
//     );

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Reset failed');
//     });
//   });
// });
// test('shows error for weak password', async () => {
//   renderPage();

//   await userEvent.type(
//     screen.getByLabelText(/New Password/i),
//     'abc'
//   );

//   await userEvent.click(
//     screen.getByRole('button', { name: /Update Password/i })
//   );

//   // expect(
//   //   await screen.findByText(/password must be at least 6 characters/i)
//   // );
//   expect(toast.error).toHaveBeenCalledWith('Password must be at least 6 characters');
// });


import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import ResetPassword from '../pages/ResetPassword';
import resetPassword from '../services/resetPwdService';
import { toast } from 'react-toastify';
import axios from 'axios';

/* ---------------- MOCKS ---------------- */

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../services/resetPwdService', () => jest.fn());

jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

const mockedAxios = axios as unknown as {
  isAxiosError: jest.Mock;
};

/* --------------- RENDER HELPER --------------- */

const renderPage = () =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/reset-password',
          state: { email: 'test@example.com' },
        } as any,
      ]}
    >
      <ResetPassword />
    </MemoryRouter>
  );

/* --------------- TEST CASES --------------- */

describe('ResetPassword Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders reset password page', () => {
    renderPage();

    expect(screen.getByText(/reset password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /update password/i })
    ).toBeInTheDocument();
  });

  test('shows validation error if password is less than 6 characters', async () => {
    renderPage();

    await userEvent.type(
      screen.getByPlaceholderText(/••••••••/i),
      '123'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /update password/i })
    );

    expect(toast.error).toHaveBeenCalledWith(
      'Password must be at least 6 characters'
    );
  });

  test('calls API and shows success toast', async () => {
    (resetPassword as jest.Mock).mockResolvedValueOnce({});

    renderPage();

    await userEvent.type(
      screen.getByPlaceholderText(/••••••••/i),
      'password123'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /update password/i })
    );

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );

      expect(toast.success).toHaveBeenCalledWith(
        'Password Reset Successfully'
      );
    });
  });

  test('shows backend error if axios error', async () => {
    (resetPassword as jest.Mock).mockRejectedValueOnce({
      response: {
        data: { message: 'Invalid token' },
      },
    });

    mockedAxios.isAxiosError.mockReturnValue(true);

    renderPage();

    await userEvent.type(
      screen.getByPlaceholderText(/••••••••/i),
      'password123'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /update password/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid token');
    });
  });

  test('shows generic error for non-axios error', async () => {
    (resetPassword as jest.Mock).mockRejectedValueOnce(
      new Error('Something went wrong')
    );

    mockedAxios.isAxiosError.mockReturnValue(false);

    renderPage();

    await userEvent.type(
      screen.getByPlaceholderText(/••••••••/i),
      'password123'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /update password/i })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'An unexpected error occurred'
      );
    });
  });

  test('button is disabled when loading', async () => {
  (resetPassword as jest.Mock).mockImplementation(
    () => new Promise(() => {})
  );

  renderPage();

  await userEvent.type(
    screen.getByPlaceholderText(/••••••••/i),
    'password123'
  );

  const button = screen.getByRole('button', {
    name: /update password/i,
  });

  await userEvent.click(button);

  expect(button).toBeDisabled();
});
});
