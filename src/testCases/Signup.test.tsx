import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Signup from '../pages/Signup';
import authReducer from '../features/auth/authSlice';
import { AuthState } from '../features/auth/types';
import { TooltipProvider } from '@radix-ui/react-tooltip';


// ✅ mock API service
jest.mock('../services/AuthService', () => ({
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


test('shows  validation errors when submitting empty form', async()=>{
renderWithProviders(<Signup />);

// find the submit button (as a user would)
const submitButton = screen.getByRole('button',{name:/get started for free/i,});


//user click submit without typing anything
await userEvent.click(submitButton);

  //Assert validation messages appear
  expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Please confirm your password/i)).toBeInTheDocument();
});

test('shows error when passwords do not match', async () => {
  renderWithProviders(<Signup />);

  await userEvent.type(
    screen.getByLabelText(/^password$/i),
    'Password123'
  );

  await userEvent.type(
    screen.getByLabelText(/confirm password/i),
    'DifferentPassword'
  );

  await userEvent.click(
    screen.getByRole('button', { name: /get started for free/i })
  );

  expect(
    await screen.findByText(/passwords do not match/i)
  ).toBeInTheDocument();
});


test('disables submit button when loading', () => {
  const loadingStore = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        loading: true,
        error: null,
      },
    },
  });

  render(
    <Provider store={loadingStore}>
      <MemoryRouter>
        <TooltipProvider>
          <Signup />
        </TooltipProvider>
      </MemoryRouter>
    </Provider>
  );

  const button = screen.getByRole('button', {
    name: /signing up/i,
  });

  expect(button).toBeDisabled();
});


test('dispatches registerUser on valid submit', async () => {
  const spy = jest.spyOn(store, 'dispatch');

  renderWithProviders(<Signup />);

  // 🔑 REQUIRED for validation to pass
  await userEvent.type(
    screen.getByLabelText(/full name/i),
    'Pooja'
  );

  await userEvent.type(
    screen.getByLabelText(/email/i),
    'pooja@test.com'
  );

  await userEvent.type(
    screen.getByLabelText(/^password$/i),
    'Password123'
  );

  await userEvent.type(
    screen.getByLabelText(/confirm password/i),
    'Password123'
  );

  await userEvent.click(
    screen.getByRole('button', { name: /get started for free/i })
  );

  expect(spy).toHaveBeenCalled();
});


test('shows error for invalid email format', async () => {
  renderWithProviders(<Signup />);

  await userEvent.type(
    screen.getByLabelText(/email/i),
    'invalid-email'
  );

  await userEvent.click(
    screen.getByRole('button', { name: /get started for free/i })
  );

  expect(
    await screen.findByText(/enter a valid email address/i)
  ).toBeInTheDocument();
});

test('shows error for weak password', async () => {
  renderWithProviders(<Signup />);

  await userEvent.type(
    screen.getByLabelText(/^password$/i),
    'abc'
  );

  await userEvent.click(
    screen.getByRole('button', { name: /get started for free/i })
  );

  expect(
    await screen.findByText(/password must be at least 4 characters/i)
  ).toBeInTheDocument();
});


test('shows error for fullNames', async () => {
  renderWithProviders(<Signup />);

  await userEvent.type(
    screen.getByLabelText(/full name/i),
    'A'
  );

  

  await userEvent.click(
    screen.getByRole('button', { name: /get started for free/i })
  );

  expect(
    await screen.findByText(/Name must be at least 2 characters/i)
  ).toBeInTheDocument();
});


test('shows API error message from redux state', () => {
  const errorStore = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        loading: false,
        error: 'Email already exists',
      },
    },
  });

  render(
    <Provider store={errorStore}>
      <MemoryRouter>
        <TooltipProvider>
          <Signup />
        </TooltipProvider>
      </MemoryRouter>
    </Provider>
  );

  expect(
    screen.getByText(/email already exists/i)
  ).toBeInTheDocument();
});
