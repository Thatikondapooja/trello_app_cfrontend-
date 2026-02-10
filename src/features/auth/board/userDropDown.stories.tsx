import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import UserDropdown from './userDropDown';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../../auth/authSlice';

// A "Mock" store to provide fake user data to the component
const mockStore = (user: any) => configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: {
        auth: {
            user,
            token: 'fake-token',
            isAuthenticated: !!user,
            loading: false,
            error: null,
            status: 'idle'
        } as any
    }
});

const meta: Meta<typeof UserDropdown> = {
    title: 'Features/Auth/UserDropdown',
    component: UserDropdown,
    tags: ['autodocs'],
    decorators: [
        (Story: any, context: any) => (
            <Provider store={mockStore(context.args.user)}>
                <BrowserRouter>
                    <div className="p-20 bg-slate-100 min-h-[300px] relative">
                        <Story />
                    </div>
                </BrowserRouter>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof UserDropdown>;

export const Default: Story = {
    args: {
        isOpen: true,
        user: { FullName: 'Pooja T', email: 'pooja@example.com' },
        onClose: () => console.log('Close clicked'),
    } as any,
};

export const GuestUser: Story = {
    args: {
        isOpen: true,
        user: null,
        onClose: () => console.log('Close clicked'),
    } as any,
};
