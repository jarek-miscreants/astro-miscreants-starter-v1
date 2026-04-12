# Button

**File:** `src/components/Button.astro`

## What it does

Renders a call-to-action element as either an `<a>` or `<button>` depending on whether an `href` is provided. Includes an animated arrow icon that slides on hover.

## Props

| Prop      | Type                          | Default        | Description                                      |
|-----------|-------------------------------|----------------|--------------------------------------------------|
| `label`   | `string`                      | `"Learn More"` | Text displayed inside the button                 |
| `variant` | `"primary" \| "secondary"`    | `"primary"`    | Visual style — filled color or outlined           |
| `href`    | `string`                      | `undefined`    | If provided, renders as `<a>`; otherwise `<button>` |
| `type`    | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type (ignored when `href` is set)    |

## How it works

- Uses Astro's dynamic tag pattern: `const Tag = href ? "a" : "button"` to pick the right HTML element at build time.
- The `type` attribute is only applied when rendering as `<button>` (no `href`).
- Variant classes are looked up from a map (`variantClasses[variant]`), making it easy to add new variants.
- The arrow icon uses a two-layer CSS overflow trick: one arrow slides out to the right while a duplicate slides in from the left on hover, creating a continuous loop effect.
- SVGs have `aria-hidden="true"` and `focusable="false"` since they are decorative.

## Usage

```astro
---
import Button from "../components/Button.astro";
---

<!-- Link button -->
<Button label="Get Started" href="/signup" />

<!-- Form submit -->
<Button label="Submit" variant="secondary" type="submit" />

<!-- Default (Learn More, primary, button element) -->
<Button />
```

## Notes

- The arrow animation is CSS-only via Tailwind's `group-hover` utilities — no JS needed.
- The component does not accept a `class` prop. Wrap it in a container if you need custom spacing.
