import '@testing-library/jest-dom';

/* 🔧 Mock Tooltip to avoid act warnings */
jest.mock('@radix-ui/react-tooltip', () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Login from '../pages/Login';
import authReducer from '../features/auth/authSlice';
import { AuthState } from '../features/auth/types';
import { store } from '../app/store';

/* 🔧 Mock API */
jest.mock('../services/AuthService', () => ({
  login: jest.fn(),
}));

/*Helpers */
const createStore = (state: AuthState) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: state },
  });

const renderWithProviders = (
  ui: React.ReactElement,
  state: AuthState = { user: null, token: null, loading: false, error: null }
) =>
  render(
    <Provider store={createStore(state)}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

/* -------------------------------------------------
   ✅ TESTS
-------------------------------------------------- */

test('renders login page', () => {
  renderWithProviders(<Login />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /continue/i })
  ).toBeInTheDocument();
});

test('allows user to type email and password', async () => {
  renderWithProviders(<Login />);

  await userEvent.type(screen.getByLabelText(/email/i), 'pooja@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'Password123');

  expect(screen.getByLabelText(/email/i)).toHaveValue('pooja@test.com');
  expect(screen.getByLabelText(/password/i)).toHaveValue('Password123');
});

test('shows validation errors on empty submit', async () => {
  renderWithProviders(<Login />);

  await userEvent.click(
    screen.getByRole('button', { name: /continue/i })
  );

  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
});

test('shows error for invalid email', async () => {
  renderWithProviders(<Login />);

  await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');

  await userEvent.click(
    screen.getByRole('button', { name: /continue/i })
  );

  expect(
    await screen.findByText(/enter a valid email address/i)
  ).toBeInTheDocument();
});

test('shows error for short password', async () => {
  renderWithProviders(<Login />);

  await userEvent.type(screen.getByLabelText(/password/i), '123');

  await userEvent.click(
    screen.getByRole('button', { name: /continue/i })
  );

  expect(
    await screen.findByText(/password must be at least 6 characters/i)
  ).toBeInTheDocument();
});

test('disables submit button when loading', () => {
  renderWithProviders(<Login />, {
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  expect(
    screen.getByRole('button', { name: /signing in/i })
  ).toBeDisabled();
});

test('shows API error from redux state', () => {
  renderWithProviders(<Login />, {
    user: null,
    token: null,
    loading: false,
    error: 'Invalid credentials',
  });

  expect(
    screen.getByText(/invalid credentials/i)
  ).toBeInTheDocument();
});

test('shows error for invalid email', async () => {
  renderWithProviders(<Login />);

  await userEvent.type(screen.getByLabelText(/email/i), 'abc');
  // await userEvent.type(screen.getByLabelText(/password/i), '123456');

  await userEvent.click(screen.getByRole('button', { name: /continue/i }));

  expect(
    await screen.findByText(/enter a valid email address/i)
  ).toBeInTheDocument();
});

test('shows error for short password', async () => {
  renderWithProviders(<Login />);

  // await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), '123');

  await userEvent.click(screen.getByRole('button', { name: /continue/i }));

  expect(
    await screen.findByText(/password must be at least 6 characters/i)
  ).toBeInTheDocument();
});

test('does not dispatch login when validation fails', async () => {
  const testStore = createStore({
    user: null,
    token: null,
    loading: false,
    error: null,
  });

  const spy = jest.spyOn(testStore, 'dispatch');

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  await userEvent.click(
    screen.getByRole('button', { name: /continue/i })
  );

  expect(spy).not.toHaveBeenCalled();
});
