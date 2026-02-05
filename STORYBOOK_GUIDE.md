# 📚 Complete Storybook Guide - From Basics to Advanced

## Table of Contents
1. [What is Storybook?](#what-is-storybook)
2. [Why Use Storybook?](#why-use-storybook)
3. [Understanding Story Files](#understanding-story-files)
4. [Step-by-Step Code Explanation](#step-by-step-code-explanation)
5. [How to Write Your Own Stories](#how-to-write-your-own-stories)
6. [Common Patterns and Best Practices](#common-patterns-and-best-practices)
7. [Real Examples from Your Project](#real-examples-from-your-project)

---

## What is Storybook?

**Storybook** is a tool for developing UI components in **isolation**. Think of it as a playground where you can:
- Build and test components without running your entire application
- See all possible states of a component (loading, error, success, etc.)
- Document how components work
- Test components visually
- Share component libraries with your team

### Real-World Analogy
Imagine you're building a car. Instead of building the entire car to test if the headlights work, you can test just the headlights on a workbench. That's what Storybook does for UI components!

---

## Why Use Storybook?

### Benefits:
1. **Isolated Development**: Test components without worrying about the rest of the app
2. **Visual Testing**: See all variations of a component at once
3. **Documentation**: Automatically generate documentation for your components
4. **Faster Development**: No need to navigate through your app to see a component
5. **Quality Assurance**: Catch UI bugs before they reach production
6. **Team Collaboration**: Designers and developers can review components together

---

## Understanding Story Files

A **story** is a single state or variation of a component. For example, a Button component might have these stories:
- Primary Button
- Secondary Button
- Disabled Button
- Loading Button

### File Naming Convention
Stories are typically named: `ComponentName.stories.tsx` or `ComponentName.stories.ts`

Example: `userDropDown.stories.tsx`

---

## Step-by-Step Code Explanation

Let's break down your `userDropDown.stories.tsx` file line by line:

### Part 1: Imports (Lines 1-8)

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import UserDropdown from './userDropDown';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../../auth/authSlice';
```

**Explanation:**
- `React`: Required for JSX
- `Meta, StoryObj`: TypeScript types from Storybook that help define story structure
  - `Meta`: Defines metadata about the component (title, decorators, etc.)
  - `StoryObj`: Defines individual story configurations
- `UserDropdown`: The actual component you're creating stories for
- `Provider, configureStore`: Redux dependencies needed because UserDropdown uses Redux
- `BrowserRouter`: React Router dependency needed because UserDropdown uses navigation
- `authReducer`: The Redux slice that manages authentication state

**Why these imports?**
Your UserDropdown component depends on Redux state and React Router. In Storybook, you need to provide these dependencies manually since you're testing in isolation.

---

### Part 2: Mock Store (Lines 10-25)

```typescript
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
```

**Explanation:**
- `mockStore`: A function that creates a fake Redux store for testing
- `user: any`: Takes a user object as parameter (can be real user data or null)
- `configureStore`: Creates a Redux store
- `reducer`: Defines which reducers to use (in this case, just auth)
- `preloadedState`: Initial state of the store
  - `user`: The user data passed to the function
  - `token`: A fake authentication token
  - `isAuthenticated`: Boolean - true if user exists, false otherwise (`!!user` converts to boolean)
  - `loading`, `error`, `status`: Other auth state properties

**Why do we need this?**
Your UserDropdown component reads user data from Redux using `useSelector((state: RootState) => state.auth.user)`. In Storybook, we need to provide this Redux state, so we create a mock store with fake data.

---

### Part 3: Meta Configuration (Lines 27-42)

```typescript
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
```

**Explanation:**

**`meta` object**: Contains metadata about all stories for this component

- **`title: 'Features/Auth/UserDropdown'`**: 
  - Defines where this component appears in Storybook's sidebar
  - Creates a hierarchy: Features → Auth → UserDropdown
  - You can use any structure: `'Components/Buttons/PrimaryButton'`

- **`component: UserDropdown`**: 
  - The actual component being documented
  - Storybook uses this to extract props and generate documentation

- **`tags: ['autodocs']`**: 
  - Tells Storybook to automatically generate documentation
  - Creates a "Docs" tab with component info, props table, and examples

- **`decorators`**: 
  - Wrappers that provide context to your component
  - Think of them as "setup code" that runs before rendering each story
  
  **Decorator breakdown:**
  ```typescript
  (Story: any, context: any) => (...)
  ```
  - `Story`: The actual story component being rendered
  - `context`: Contains information about the current story (including `args`)
  
  ```typescript
  <Provider store={mockStore(context.args.user)}>
  ```
  - Wraps the story in Redux Provider
  - Creates a mock store with the user data from story args
  
  ```typescript
  <BrowserRouter>
  ```
  - Provides React Router context (needed for `useNavigate`)
  
  ```typescript
  <div className="p-20 bg-slate-100 min-h-[300px] relative">
  ```
  - Adds styling/spacing around the component for better visualization
  - `p-20`: padding
  - `bg-slate-100`: light gray background
  - `min-h-[300px]`: minimum height
  - `relative`: positioning context for the dropdown

---

### Part 4: Export Default (Lines 44-45)

```typescript
export default meta;
type Story = StoryObj<typeof UserDropdown>;
```

**Explanation:**
- `export default meta`: Required by Storybook - exports the metadata
- `type Story = StoryObj<typeof UserDropdown>`: Creates a TypeScript type for stories
  - Makes it easier to write individual stories with type safety
  - Ensures story args match component props

---

### Part 5: Individual Stories (Lines 47-61)

#### Story 1: Default (Logged-in User)

```typescript
export const Default: Story = {
    args: {
        isOpen: true,
        user: { FullName: 'Pooja T', email: 'pooja@example.com' },
        onClose: () => console.log('Close clicked'),
    } as any,
};
```

**Explanation:**
- `export const Default`: Creates a story named "Default"
  - Must be exported to appear in Storybook
  - Name appears in Storybook sidebar
- `Story`: Uses the type we defined earlier
- `args`: Props passed to the component
  - `isOpen: true`: Shows the dropdown open
  - `user`: Mock user data with name and email
  - `onClose`: A function that logs when close is triggered
- `as any`: TypeScript workaround (not ideal, but works)

**What this story shows:**
A dropdown for a logged-in user with name "Pooja T"

---

#### Story 2: Guest User

```typescript
export const GuestUser: Story = {
    args: {
        isOpen: true,
        user: null,
        onClose: () => console.log('Close clicked'),
    } as any,
};
```

**Explanation:**
- Same structure as Default story
- `user: null`: Simulates a guest/logged-out user
- Tests how the component handles missing user data

**What this story shows:**
How the dropdown looks when no user is logged in

---

## How to Write Your Own Stories

### Step-by-Step Process:

#### Step 1: Create the Story File

Create a file named `ComponentName.stories.tsx` next to your component:

```
src/
  components/
    Button.tsx
    Button.stories.tsx  ← Create this
```

---

#### Step 2: Import Dependencies

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button'; // Your component
// Import any other dependencies your component needs
```

---

#### Step 3: Define Meta Configuration

```typescript
const meta: Meta<typeof Button> = {
    title: 'Components/Button',  // Where it appears in sidebar
    component: Button,
    tags: ['autodocs'],
    // Add decorators if needed (for Redux, Router, etc.)
};

export default meta;
type Story = StoryObj<typeof Button>;
```

---

#### Step 4: Create Stories

```typescript
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

// Story 3: Disabled button
export const Disabled: Story = {
    args: {
        label: 'Disabled',
        variant: 'primary',
        disabled: true,
        onClick: () => alert('Should not fire'),
    },
};
```

---

## Common Patterns and Best Practices

### 1. **Naming Stories**

Use descriptive names that explain the state:
```typescript
export const Default: Story = { ... };
export const WithLongText: Story = { ... };
export const Loading: Story = { ... };
export const Error: Story = { ... };
export const Empty: Story = { ... };
```

---

### 2. **Using Decorators**

Decorators wrap your stories with necessary context:

**For Redux:**
```typescript
decorators: [
    (Story) => (
        <Provider store={mockStore}>
            <Story />
        </Provider>
    ),
],
```

**For React Router:**
```typescript
decorators: [
    (Story) => (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    ),
],
```

**For Styling/Layout:**
```typescript
decorators: [
    (Story) => (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <Story />
        </div>
    ),
],
```

**Multiple Decorators:**
```typescript
decorators: [
    (Story) => (
        <Provider store={mockStore}>
            <BrowserRouter>
                <div className="p-4">
                    <Story />
                </div>
            </BrowserRouter>
        </Provider>
    ),
],
```

---

### 3. **Using Args vs ArgTypes**

**Args**: Actual values passed to the component
```typescript
export const Example: Story = {
    args: {
        title: 'Hello',
        isOpen: true,
    },
};
```

**ArgTypes**: Control how args appear in Storybook's controls panel
```typescript
const meta: Meta<typeof Component> = {
    title: 'Example',
    component: Component,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
    },
};
```

---

### 4. **Testing Different States**

Create stories for all important states:

```typescript
// Normal state
export const Default: Story = {
    args: { data: mockData },
};

// Loading state
export const Loading: Story = {
    args: { isLoading: true },
};

// Error state
export const Error: Story = {
    args: { error: 'Something went wrong!' },
};

// Empty state
export const Empty: Story = {
    args: { data: [] },
};

// With lots of data
export const WithManyItems: Story = {
    args: { data: generateMockData(100) },
};
```

---

## Real Examples from Your Project

### Example 1: Simple Component (No Dependencies)

Let's say you have a simple `Badge` component:

```typescript
// Badge.tsx
interface BadgeProps {
    text: string;
    color?: 'blue' | 'green' | 'red';
}

const Badge: React.FC<BadgeProps> = ({ text, color = 'blue' }) => {
    return (
        <span className={`badge badge-${color}`}>
            {text}
        </span>
    );
};
```

**Story file:**

```typescript
// Badge.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Blue: Story = {
    args: {
        text: 'New',
        color: 'blue',
    },
};

export const Green: Story = {
    args: {
        text: 'Success',
        color: 'green',
    },
};

export const Red: Story = {
    args: {
        text: 'Error',
        color: 'red',
    },
};
```

---

### Example 2: Component with Redux (Like Your UserDropdown)

```typescript
// Component that uses Redux
import { useSelector } from 'react-redux';

const UserProfile: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    
    return (
        <div>
            <h1>{user?.FullName}</h1>
            <p>{user?.email}</p>
        </div>
    );
};
```

**Story file:**

```typescript
// UserProfile.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserProfile from './UserProfile';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';

// Mock store function
const mockStore = (user: any) => configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
        auth: {
            user,
            token: 'fake-token',
            isAuthenticated: !!user,
            loading: false,
            error: null,
            status: 'idle'
        }
    }
});

const meta: Meta<typeof UserProfile> = {
    title: 'Features/UserProfile',
    component: UserProfile,
    tags: ['autodocs'],
    decorators: [
        (Story, context) => (
            <Provider store={mockStore(context.args.user)}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const LoggedInUser: Story = {
    args: {
        user: {
            FullName: 'John Doe',
            email: 'john@example.com'
        }
    } as any,
};

export const GuestUser: Story = {
    args: {
        user: null
    } as any,
};
```

---

### Example 3: Component with Actions/Events

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

export const Primary: Story = {
    args: {
        label: 'Click Me',
        onClick: () => {
            console.log('Button clicked!');
            alert('You clicked the button!');
        },
    },
};

export const WithCustomAction: Story = {
    args: {
        label: 'Submit',
        onClick: () => {
            console.log('Submitting form...');
            // You can test any logic here
        },
    },
};
```

---

## Quick Reference: Story Template

Use this template for any new component:

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';
// Import any dependencies (Redux, Router, etc.)

// If component needs Redux:
const mockStore = (initialState: any) => configureStore({
    reducer: { /* your reducers */ },
    preloadedState: initialState
});

const meta: Meta<typeof YourComponent> = {
    title: 'Category/YourComponent',
    component: YourComponent,
    tags: ['autodocs'],
    
    // Add decorators if needed:
    decorators: [
        (Story) => (
            // Wrap with necessary providers
            <Story />
        ),
    ],
    
    // Optional: Control how props appear in Storybook
    argTypes: {
        // Define controls for props
    },
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

// Create your stories:
export const Default: Story = {
    args: {
        // Component props
    },
};

export const AnotherVariation: Story = {
    args: {
        // Different props
    },
};
```

---

## Running Storybook

To view your stories:

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

Then open your browser to `http://localhost:6006` (or the port shown in terminal).

---

## Summary

### Key Concepts:
1. **Story**: One variation/state of a component
2. **Meta**: Configuration for all stories of a component
3. **Args**: Props passed to the component
4. **Decorators**: Wrappers that provide context (Redux, Router, etc.)
5. **Tags**: Enable features like auto-documentation

### Writing Process:
1. Create `ComponentName.stories.tsx`
2. Import component and Storybook types
3. Set up dependencies (mock stores, routers, etc.)
4. Define meta configuration
5. Create individual stories for different states
6. Export everything

### Best Practices:
- Create stories for all important states
- Use descriptive story names
- Add decorators for dependencies
- Test edge cases (empty, loading, error states)
- Document complex props with argTypes

---

## Need Help?

If you want to create a story for a specific component, just ask! Provide:
1. The component file
2. What states you want to test
3. Any dependencies it uses (Redux, Router, etc.)

I'll help you write the complete story file! 🚀
