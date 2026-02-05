import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

/**
 * Tooltip component displays helpful information when users hover over elements.
 * Built with Radix UI for accessibility and smooth animations.
 */
const meta: Meta<typeof Tooltip> = {
    title: 'Components/Common/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],

    // Radix UI Tooltip requires a Provider wrapper
    decorators: [
        (Story) => (
            <TooltipPrimitive.Provider>
                <div className="flex items-center justify-center min-h-[200px] p-8">
                    <Story />
                </div>
            </TooltipPrimitive.Provider>
        ),
    ],

    // Define controls for interactive props
    argTypes: {
        content: {
            control: 'text',
            description: 'The content to display in the tooltip',
        },
        side: {
            control: { type: 'select' },
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Which side of the trigger to show the tooltip',
        },
        align: {
            control: { type: 'select' },
            options: ['start', 'center', 'end'],
            description: 'How to align the tooltip relative to the trigger',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Default tooltip that appears on top with center alignment
 */
export const Default: Story = {
    args: {
        content: 'This is a helpful tooltip!',
        side: 'top',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Hover me
            </button>
        ),
    },
};

/**
 * Tooltip positioned on the right side
 */
export const RightSide: Story = {
    args: {
        content: 'Tooltip on the right',
        side: 'right',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Hover for right tooltip
            </button>
        ),
    },
};

/**
 * Tooltip positioned on the bottom
 */
export const BottomSide: Story = {
    args: {
        content: 'Tooltip on the bottom',
        side: 'bottom',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Hover for bottom tooltip
            </button>
        ),
    },
};

/**
 * Tooltip positioned on the left side
 */
export const LeftSide: Story = {
    args: {
        content: 'Tooltip on the left',
        side: 'left',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Hover for left tooltip
            </button>
        ),
    },
};

/**
 * Tooltip with long text content
 */
export const LongContent: Story = {
    args: {
        content: 'This is a much longer tooltip message that demonstrates how the tooltip handles multiple lines of text and wraps appropriately.',
        side: 'top',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Long tooltip
            </button>
        ),
    },
};

/**
 * Tooltip with React component as content
 */
export const WithReactContent: Story = {
    args: {
        content: (
            <div>
                <strong>Bold Title</strong>
                <p className="text-xs mt-1">You can use React components!</p>
            </div>
        ),
        side: 'top',
        align: 'center',
        children: (
            <button className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                Rich content
            </button>
        ),
    },
};

/**
 * Tooltip on an icon button
 */
export const OnIconButton: Story = {
    args: {
        content: 'Delete item',
        side: 'left',
        align: 'center',
        children: (
            <button className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                🗑️
            </button>
        ),
    },
};

/**
 * Tooltip on a text link
 */
export const OnTextLink: Story = {
    args: {
        content: 'Click to learn more',
        side: 'bottom',
        align: 'center',
        children: (
            <a href="#" className="text-indigo-600 underline hover:text-indigo-800">
                What is this?
            </a>
        ),
    },
};

/**
 * Tooltip with start alignment
 */
export const AlignStart: Story = {
    args: {
        content: 'Aligned to start',
        side: 'bottom',
        align: 'start',
        children: (
            <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Start aligned tooltip
            </button>
        ),
    },
};

/**
 * Tooltip with end alignment
 */
export const AlignEnd: Story = {
    args: {
        content: 'Aligned to end',
        side: 'bottom',
        align: 'end',
        children: (
            <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                End aligned tooltip
            </button>
        ),
    },
};

/**
 * Multiple tooltips in a row
 */
export const MultipleTooltips: Story = {
    render: () => (
        <div className="flex gap-4">
            <Tooltip content="First tooltip" side="top">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Button 1
                </button>
            </Tooltip>
            <Tooltip content="Second tooltip" side="top">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Button 2
                </button>
            </Tooltip>
            <Tooltip content="Third tooltip" side="top">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Button 3
                </button>
            </Tooltip>
        </div>
    ),
};

/**
 * Tooltip on disabled button (shows you can still tooltip disabled elements)
 */
export const OnDisabledButton: Story = {
    args: {
        content: 'This button is disabled',
        side: 'top',
        align: 'center',
        children: (
            <span className="inline-block">
                <button
                    disabled
                    className="px-4 py-2 bg-gray-400 text-gray-200 rounded-lg cursor-not-allowed"
                >
                    Disabled Button
                </button>
            </span>
        ),
    },
};
