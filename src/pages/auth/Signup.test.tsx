import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Signup from '../Signup';
import authReducer from '../../features/auth/authSlice';
import { AuthState } from '../../features/auth/types';
import { TooltipProvider } from '@radix-ui/react-tooltip';

// ✅ mock API service
jest.mock('../../services/AuthService', () => ({
  signup: jest.fn(),
}));

const mockAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: mockAuthState
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
   <Provider store={store}>
  <MemoryRouter>
    <TooltipProvider>
      {ui}
    </TooltipProvider>
  </MemoryRouter>
</Provider>

  );
};

test('render the signup page', () => {
  renderWithProviders(<Signup />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Get Started for Free/i })).toBeInTheDocument();
});

test('allows user to type in signup inputs', async () => {
  renderWithProviders(<Signup />);

  await userEvent.type(
    screen.getByLabelText(/email/i),
    'pooja@test.com'
  );
  await userEvent.type(
    screen.getByLabelText(/^password$/i),
    'Password@123'
  );
  await userEvent.type(
    screen.getByLabelText(/confirm password/i),
    'Password@123'
  );

  expect(screen.getByLabelText(/email/i)).toHaveValue('pooja@test.com');
  expect(screen.getByLabelText(/^password$/i)).toHaveValue('Password@123');
  expect(screen.getByLabelText(/confirm password/i)).toHaveValue('Password@123');
});
