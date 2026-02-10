# 🎯 Quick Start: Writing Your First Story

This is a simplified, step-by-step guide to get you started quickly!

## 📝 The Basic Template

Every story file follows this pattern:

```typescript
// 1. IMPORTS
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

// 2. META CONFIGURATION
const meta: Meta<typeof YourComponent> = {
    title: 'Category/YourComponent',  // Where it appears in Storybook sidebar
    component: YourComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

// 3. STORIES
export const Default: Story = {
    args: {
        // Your component props go here
    },
};
```

---

## 🚀 Real Example: Simple Button

Let's say you have this Button component:

```typescript
// Button.tsx
interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick }) => {
    return (
        <button 
            className={`btn btn-${variant}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
```

### Write the Story:

```typescript
// Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Story 1: Primary button
export const Primary: Story = {
    args: {
        label: 'Click Me',
        variant: 'primary',
        onClick: () => alert('Clicked!'),
    },
};

// Story 2: Secondary button
export const Secondary: Story = {
    args: {
        label: 'Cancel',
        variant: 'secondary',
        onClick: () => alert('Cancelled!'),
    },
};
```

**That's it!** You now have 2 stories showing different button variants.

---

## 🔧 When Your Component Uses Redux

If your component uses `useSelector` or `useDispatch`, you need to wrap it with Redux Provider:

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './yourSlice';

// Create a mock store
const mockStore = configureStore({
    reducer: {
        yourSlice: yourReducer,
    },
    preloadedState: {
        yourSlice: {
            // Your initial state here
            data: 'some data',
        }
    }
});

const meta: Meta<typeof YourComponent> = {
    title: 'Components/YourComponent',
    component: YourComponent,
    tags: ['autodocs'],
    
    // Wrap with Redux Provider
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
    args: {},
};
```

---

## 🛣️ When Your Component Uses React Router

If your component uses `useNavigate` or `Link`, wrap it with BrowserRouter:

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof YourComponent> = {
    title: 'Components/YourComponent',
    component: YourComponent,
    tags: ['autodocs'],
    
    // Wrap with Router
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
    args: {},
};
```

---

## 🎨 Adding Visual Styling to Stories

Sometimes you want to add padding or background to make the component look better:

```typescript
const meta: Meta<typeof YourComponent> = {
    title: 'Components/YourComponent',
    component: YourComponent,
    tags: ['autodocs'],
    
    decorators: [
        (Story) => (
            <div className="p-8 bg-gray-100 min-h-[300px]">
                <Story />
            </div>
        ),
    ],
};
```

---

## 📚 Multiple Stories for Different States

Create multiple exports to show different variations:

```typescript
// Normal state
export const Default: Story = {
    args: {
        isLoading: false,
        data: ['Item 1', 'Item 2', 'Item 3'],
    },
};

// Loading state
export const Loading: Story = {
    args: {
        isLoading: true,
        data: [],
    },
};

// Empty state
export const Empty: Story = {
    args: {
        isLoading: false,
        data: [],
    },
};

// Error state
export const Error: Story = {
    args: {
        isLoading: false,
        error: 'Failed to load data',
    },
};
```

---

## ✅ Checklist for Writing Stories

- [ ] Create `ComponentName.stories.tsx` file
- [ ] Import React, Meta, StoryObj, and your component
- [ ] Set up meta configuration with title and component
- [ ] Add decorators if component needs Redux/Router/etc.
- [ ] Export default meta
- [ ] Create type alias: `type Story = StoryObj<typeof Component>`
- [ ] Create at least one story with `export const`
- [ ] Add args matching your component's props
- [ ] Test different states (loading, error, empty, etc.)

---

## 🎯 Common Patterns

### Pattern 1: Simple Component (No Dependencies)
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Component from './Component';

const meta: Meta<typeof Component> = {
    title: 'Components/Component',
    component: Component,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
    args: { /* props */ },
};
```

### Pattern 2: Component with Redux
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Component from './Component';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slice';

const mockStore = configureStore({
    reducer: { slice: reducer },
    preloadedState: { slice: { /* state */ } }
});

const meta: Meta<typeof Component> = {
    title: 'Components/Component',
    component: Component,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
    args: { /* props */ },
};
```

### Pattern 3: Component with Router
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Component from './Component';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Component> = {
    title: 'Components/Component',
    component: Component,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
    args: { /* props */ },
};
```

---

## 🏃 Running Storybook

```bash
npm run storybook
```

Then open: `http://localhost:6006`

---

## 💡 Tips

1. **Start Simple**: Begin with just a Default story, then add more variations
2. **Name Stories Clearly**: Use names like `Loading`, `Error`, `Empty`, `WithLongText`
3. **Test Edge Cases**: Create stories for unusual or extreme scenarios
4. **Use Console Logs**: For onClick handlers, use `() => console.log('clicked')` to test
5. **Add Comments**: Explain what each story demonstrates

---

## 🆘 Troubleshooting

### "Cannot find module '@storybook/react'"
Run: `npm install --save-dev @storybook/react`

### Component doesn't render
- Check if you need decorators (Redux Provider, Router, etc.)
- Verify your args match the component's prop types

### Stories don't appear in Storybook
- Make sure file ends with `.stories.tsx` or `.stories.ts`
- Check that you're exporting `default meta`
- Verify stories are exported with `export const`

---

## 📖 Next Steps

1. Read the full guide: `STORYBOOK_GUIDE.md`
2. Look at examples: `userDropDown.stories.tsx`, `Tooltip.stories.tsx`
3. Try writing a story for one of your components
4. Experiment with different args and decorators

**Remember**: Every story is just showing one state of your component with specific props! 🎉
