
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Dashboard from './Dashboard';
import authReducer from "../../features/auth/authSlice";
import boardReducer from "../../features/auth/board/boardSlice";
// Create mock Redux store with test data
import rootReducer from "../../app/rootReducer";

const mockStore = (boards: any[], user: any) => configureStore({
    reducer: rootReducer,
    preloadedState: {
        auth: {
            user: user ? JSON.parse(JSON.stringify(user)) : null,
            token: 'fake-token',
            isAuthenticated: !!user,
            loading: false,
            error: null,
            status: 'idle'
        },
        board: {
            boards: boards ? JSON.parse(JSON.stringify(boards)) : [],
            selectedBoard: null,
            loading: false,
            error: null,
        },
        list: {
            lists: [],
            loading: false,
            error: null,
        },
        card: {
            cards: [],
            selectedCard: null,
            loading: false,
            error: null,
        },
        activity: {
            activities: [],
            loading: false,
            error: null,
        },
        checklist: {
            checklists: [],
            loading: false,
            error: null,
        },
        members: {
            members: [],
            loading: false,
            error: null,
        }
    } as any
})



// Meta configuration for all Dashboard stories
const meta: Meta<typeof Dashboard> = {
    title: 'Pages/Dashboard',
    component: Dashboard,
    tags: ['autodocs'],
    decorators: [
        (Story, context: any) => (
            <Provider store={mockStore(context.args.boards, context.args.user)}>
                <BrowserRouter>
                    <TooltipPrimitive.Provider>
                        <Story />
                    </TooltipPrimitive.Provider>
                </BrowserRouter>
            </Provider>
        ),
    ],
};


export default meta;


type Story = StoryObj<typeof Dashboard>;


// Story 1: Dashboard with multiple boards
export const WithBoards: Story = {
    args: {
        user: {
            FullName: 'Pooja T',
            email: 'pooja@example.com'
        },
        boards: [
            {
                id: 1,
                title: 'Marketing Campaign',
                description: 'Q1 2026 marketing initiatives',
            },
            {
                id: 2,
                title: 'Product Development',
                description: 'Feature roadmap and sprint planning',
            },
            {
                id: 3,
                title: 'Team Onboarding',
                description: 'New employee onboarding tasks',
            },
        ]
    } as any,
};


// Story 2: Empty state (no boards)

export const EmptyState: Story = {
    args: {
        user: {
            FullName: 'Pooja T',
            email: 'pooja@example.com'
        },
        boards: []
    } as any,
};