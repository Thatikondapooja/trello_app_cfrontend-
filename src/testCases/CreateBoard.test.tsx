import '@testing-library/jest-dom';
jest.mock('axios'); // 👈 REQUIRED

/* 🔑 IMPORTANT: mock api layer */
jest.mock('../services/api');

/* 🔑 mock board thunk */
jest.mock('../features/auth/board/boardThunks', () => ({
  createBoard: jest.fn(() => ({
    unwrap: () => Promise.resolve({}),
  })),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CreateBoard from '../features/auth/board/CreateBoard';
import authReducer from '../features/auth/authSlice';

const renderWithProviders = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CreateBoard />
      </MemoryRouter>
    </Provider>
  );
};

describe('CreateBoard component', () => {
  test('renders Create Board form', () => {
    renderWithProviders();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('allows user to type title and description', async () => {
    renderWithProviders();

    await userEvent.type(screen.getByLabelText(/title/i), 'My Board');
    await userEvent.type(
      screen.getByLabelText(/description/i),
      'My board description'
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('My Board');
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      'My board description'
    );
  });

  test('shows error when submitting without title', async () => {
    renderWithProviders();

    await userEvent.click(
      screen.getByRole('button', { name: /create/i })
    );

    expect(
      await screen.findByText(/board title is required/i)
    ).toBeInTheDocument();
  });

  test('dispatches createBoard on valid submit', async () => {
    renderWithProviders();

    await userEvent.type(screen.getByLabelText(/title/i), 'My Board');

    await userEvent.click(
      screen.getByRole('button', { name: /create/i })
    );

    // error should NOT be shown
    expect(
      screen.queryByText(/board title is required/i)
    ).not.toBeInTheDocument();
  });
});
