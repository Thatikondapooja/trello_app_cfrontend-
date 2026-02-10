import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TaskCard from './TaskCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DndContext } from '@dnd-kit/core';
import authReducer from '../features/auth/authSlice';

const mockStore = configureStore({
    reducer: {
        auth: authReducer,
    },
});

const meta: Meta<typeof TaskCard> = {
    title: 'Components/TaskCard',
    component: TaskCard,
    tags: ['autodocs'],
    decorators: [
        (Story: any) => (
            <Provider store={mockStore}>
                <DndContext>
                    <div className="w-[300px] p-4 bg-slate-100">
                        <Story />
                    </div>
                </DndContext>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
    args: {
        card: {
            id: 1,
            listId: 1,
            title: 'Design New Homepage',
            labels: [
                { name: 'Design', color: 'blue' },
                { name: 'Priority', color: 'red' }
            ],
            dueDate: new Date().toISOString(),
            isCompleted: false,
            members: [
                { id: 1, FullName: 'Pooja T' }
            ],
            checklistSummary: { completed: 2, total: 5 }
        } as any,
        onClick: (id: number) => console.log('Card clicked', id),
    },
};

export const Completed: Story = {
    args: {
        card: {
            id: 2,
            listId: 1,
            title: 'Setup Database Schema',
            labels: [{ name: 'Backend', color: 'green' }],
            dueDate: new Date().toISOString(),
            isCompleted: true,
            members: [],
            checklistSummary: { completed: 10, total: 10 }
        } as any,
        onClick: (id: number) => console.log('Card clicked', id),
    },
};
