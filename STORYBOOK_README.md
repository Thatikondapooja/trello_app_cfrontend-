# 📚 Storybook Learning Resources - Start Here!

## 👋 Welcome!

I've created comprehensive guides to help you understand Storybook and how to write stories. Here's what's available and how to use them:

---

## 📖 Learning Path

### **Step 1: Quick Start** (5-10 minutes)
📄 **File**: `STORYBOOK_QUICKSTART.md`

**Start here!** This gives you the essential patterns and templates you need to write your first story.

**What you'll learn:**
- Basic story template
- How to write stories for simple components
- How to handle Redux and Router dependencies
- Common patterns you can copy-paste

**Best for**: Getting started quickly, reference templates

---

### **Step 2: Visual Understanding** (10-15 minutes)
📄 **File**: `STORYBOOK_VISUAL_GUIDE.md`

**Read this second!** This uses diagrams and visual explanations to show how everything fits together.

**What you'll learn:**
- Visual breakdown of story file structure
- How data flows from stories to components
- How decorators wrap your components
- Annotated examples with explanations

**Best for**: Understanding the "why" behind the code structure

---

### **Step 3: Deep Dive** (30-45 minutes)
📄 **File**: `STORYBOOK_GUIDE.md`

**Read this for comprehensive knowledge!** This is the complete, detailed guide that explains everything.

**What you'll learn:**
- What Storybook is and why it's useful
- Line-by-line explanation of your existing stories
- How to write stories for any component
- Best practices and common patterns
- Advanced techniques

**Best for**: Complete understanding, reference documentation

---

## 🎯 Practical Examples in Your Project

### **Example 1: Component with Redux & Router**
📄 **File**: `src/features/auth/board/userDropDown.stories.tsx`

**Your existing story!** This shows:
- How to create a mock Redux store
- How to wrap with both Redux Provider and BrowserRouter
- How to test different user states (logged in vs guest)
- How to use decorators for complex dependencies

**Key concepts demonstrated:**
- Mock store creation
- Multiple decorators
- Testing with/without user data
- Context passing via `context.args`

---

### **Example 2: Component with External Library**
📄 **File**: `src/components/comman/Tooltip.stories.tsx`

**I created this for you!** This shows:
- How to wrap components that need special providers (Radix UI)
- How to create multiple variations (different positions, alignments)
- How to use argTypes for interactive controls
- How to document component variations

**Key concepts demonstrated:**
- Provider wrapping for third-party libraries
- Multiple story variations
- Interactive controls
- Rich content examples

---

## 🚀 How to Use These Guides

### If you're a **visual learner**:
1. Start with `STORYBOOK_VISUAL_GUIDE.md`
2. Look at the examples: `userDropDown.stories.tsx` and `Tooltip.stories.tsx`
3. Use `STORYBOOK_QUICKSTART.md` as a reference when writing

### If you prefer **step-by-step instructions**:
1. Start with `STORYBOOK_QUICKSTART.md`
2. Try writing a simple story
3. Read `STORYBOOK_GUIDE.md` for deeper understanding
4. Reference the examples when stuck

### If you want **complete understanding**:
1. Read `STORYBOOK_GUIDE.md` from start to finish
2. Study the examples line-by-line
3. Use `STORYBOOK_VISUAL_GUIDE.md` to reinforce concepts
4. Keep `STORYBOOK_QUICKSTART.md` handy for quick reference

---

## 📝 Quick Reference

### Basic Story Template
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

const meta: Meta<typeof YourComponent> = {
    title: 'Category/YourComponent',
    component: YourComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
    args: {
        // Your props here
    },
};
```

### With Redux
```typescript
decorators: [
    (Story, context) => (
        <Provider store={mockStore(context.args.user)}>
            <Story />
        </Provider>
    ),
],
```

### With Router
```typescript
decorators: [
    (Story) => (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    ),
],
```

---

## 🎓 Key Concepts

### **Story**
A single variation/state of your component
```typescript
export const Loading: Story = {
    args: { isLoading: true }
};
```

### **Meta**
Configuration for all stories of a component
```typescript
const meta: Meta<typeof Component> = {
    title: 'Where/It/Appears',
    component: Component,
    decorators: [...],
};
```

### **Args**
Props passed to your component
```typescript
args: {
    prop1: 'value',
    prop2: true,
}
// Same as: <Component prop1="value" prop2={true} />
```

### **Decorators**
Wrappers that provide context (Redux, Router, styling, etc.)
```typescript
decorators: [
    (Story) => (
        <Provider>
            <Story />
        </Provider>
    ),
],
```

---

## ✅ Checklist for Writing a Story

- [ ] Create `ComponentName.stories.tsx` file
- [ ] Import React, Meta, StoryObj, and your component
- [ ] Import any dependencies (Redux, Router, etc.)
- [ ] Create mock store if component uses Redux
- [ ] Set up meta with title and component
- [ ] Add decorators if needed
- [ ] Export default meta
- [ ] Create type alias: `type Story = StoryObj<typeof Component>`
- [ ] Create at least one story
- [ ] Test in Storybook: `npm run storybook`

---

## 🎯 Common Scenarios

### Scenario 1: Simple component, no dependencies
→ Use basic template from `STORYBOOK_QUICKSTART.md`

### Scenario 2: Component uses Redux
→ See `userDropDown.stories.tsx` for example
→ Create mock store and wrap with Provider

### Scenario 3: Component uses React Router
→ Wrap with BrowserRouter in decorators

### Scenario 4: Component uses third-party library
→ See `Tooltip.stories.tsx` for example
→ Wrap with library's Provider

### Scenario 5: Component has many props
→ Create multiple stories for different combinations
→ Use argTypes to make props interactive

---

## 🆘 Troubleshooting

### Problem: "Cannot find module '@storybook/react'"
**Solution**: Run `npm install --save-dev @storybook/react`

### Problem: Component doesn't render
**Solution**: Check if you need decorators (Redux, Router, etc.)

### Problem: Stories don't appear
**Solution**: 
- File must end with `.stories.tsx`
- Must export `default meta`
- Stories must be exported: `export const StoryName`

### Problem: Props not working
**Solution**: Verify args match component's prop types exactly

---

## 📚 File Overview

| File | Purpose | Read Time | Best For |
|------|---------|-----------|----------|
| `STORYBOOK_QUICKSTART.md` | Quick templates and patterns | 5-10 min | Getting started, reference |
| `STORYBOOK_VISUAL_GUIDE.md` | Visual diagrams and flow | 10-15 min | Understanding structure |
| `STORYBOOK_GUIDE.md` | Complete detailed guide | 30-45 min | Deep understanding |
| `userDropDown.stories.tsx` | Real example with Redux/Router | 5 min | Complex dependencies |
| `Tooltip.stories.tsx` | Real example with third-party lib | 5 min | Multiple variations |

---

## 🎯 Learning Goals

After reading these guides, you should be able to:

✅ Understand what Storybook is and why it's useful
✅ Identify the parts of a story file (imports, meta, stories)
✅ Write a basic story for a simple component
✅ Add decorators for Redux, Router, or other dependencies
✅ Create multiple stories for different component states
✅ Use args to pass props to components
✅ Run and view your stories in Storybook

---

## 🚀 Next Steps

1. **Read** the guides in order (Quick Start → Visual → Deep Dive)
2. **Study** the example stories in your project
3. **Try** writing a story for a simple component
4. **Experiment** with different args and decorators
5. **Ask** questions if you get stuck!

---

## 💡 Pro Tips

1. **Start simple**: Begin with components that don't have dependencies
2. **Copy patterns**: Use the examples as templates
3. **Test often**: Run `npm run storybook` frequently to see your changes
4. **Document as you go**: Add comments explaining what each story demonstrates
5. **Think in states**: For each component, ask "What different states can this have?"

---

## 🎉 You're Ready!

You now have everything you need to understand and write Storybook stories. Pick a guide, start reading, and don't hesitate to ask questions!

**Happy coding! 🚀**

---

## 📞 Need Help?

If you want to:
- Write a story for a specific component
- Understand a particular concept better
- Debug a story that's not working
- Learn advanced Storybook features

Just ask! I'm here to help. 😊
