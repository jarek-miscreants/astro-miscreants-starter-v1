# Accordion

**File:** `src/components/Accordion.astro`

## What it does

A disclosure component that shows/hides content panels. Supports single or multiple open items, optional default-open state, and full keyboard navigation.

## Props

| Prop                | Type      | Default | Description                                           |
|---------------------|-----------|---------|-------------------------------------------------------|
| `closePrevious`     | `boolean` | `true`  | Close other items when one opens (single-open mode)   |
| `closeOnSecondClick`| `boolean` | `true`  | Allow closing an open item by clicking it again       |
| `openByDefault`     | `number`  | —       | 1-based index of the item to open on page load        |
| `class`             | `string`  | —       | Additional classes on the wrapper                     |

## How it works

### HTML structure (required in your slot content)

The component expects this data-attribute structure in its children:

```html
<div data-accordion="item">
  <div data-accordion="button">Trigger text</div>
  <div data-accordion="content">
    <div>Hidden content goes here</div>
  </div>
</div>
```

### Animation

- Uses a **CSS grid trick** for height animation: `grid-template-rows` transitions from `0fr` to `1fr`.
- No JS height calculations needed — the browser handles it natively.
- An optional `[data-accordion="icon"]` element rotates 180 degrees when active.

### ARIA & Accessibility

- Each button gets `role="button"`, `aria-expanded`, `aria-controls`, and dynamically generated IDs.
- Each content region gets `role="region"` and `aria-labelledby` pointing back to its button.
- Keyboard navigation: Arrow Up/Down moves focus between buttons, Home/End jump to first/last, Enter/Space toggles.
- Uses roving `tabindex` — only the focused button has `tabindex="0"`, others have `tabindex="-1"`.

### Script initialization

- Uses `data-script-initialized` to prevent double-initialization on Astro page transitions.

## Usage

```astro
---
import Accordion from "../components/Accordion.astro";
---

<Accordion closePrevious={true} openByDefault={1}>
  <div data-accordion="item">
    <div data-accordion="button" class="flex justify-between py-4 cursor-pointer">
      <span>Question 1</span>
      <svg data-accordion="icon" class="w-4 h-4">...</svg>
    </div>
    <div data-accordion="content">
      <div class="pb-4">Answer to question 1.</div>
    </div>
  </div>

  <div data-accordion="item">
    <div data-accordion="button" class="flex justify-between py-4 cursor-pointer">
      <span>Question 2</span>
      <svg data-accordion="icon" class="w-4 h-4">...</svg>
    </div>
    <div data-accordion="content">
      <div class="pb-4">Answer to question 2.</div>
    </div>
  </div>
</Accordion>
```

## Notes

- The content div inside `[data-accordion="content"]` **must have a single child wrapper** for the grid animation to work (`min-height: 0` is applied to direct children).
- Styles are `is:global` because the data-attribute selectors need to reach into slot content.
