# AnnouncementBanner

**File:** `src/components/AnnouncementBanner.astro`

## What it does

A top-of-page banner for site-wide announcements. Optionally links somewhere, can be dismissed, hides on scroll-down and reappears on scroll-up.

## Props

| Prop          | Type      | Default | Description                                     |
|---------------|-----------|---------|--------------------------------------------------|
| `href`        | `string`  | —       | If provided, the banner becomes a clickable link |
| `dismissible` | `boolean` | `true`  | Show a close button                              |
| `class`       | `string`  | —       | Additional classes (typically background + text color) |

## How it works

- Uses a dynamic tag: `<a>` when `href` is set, `<div>` otherwise.
- Content is passed via `<slot />`.
- When `href` is set, an arrow icon is appended.
- When `dismissible` is true, a close button appears (absolutely positioned on the right).

### Scroll behavior (client-side script)

- On page load, the banner's natural height is measured and set explicitly for CSS transitions.
- **Scroll down** (delta > 5px): banner collapses to `height: 0`.
- **Scroll up** (delta < -5px): banner expands back to its natural height.
- **Dismiss**: sets `height: 0`, stores `"announcement-dismissed"` in `sessionStorage`, then sets `display: none` after the transition ends.
- After dismissal, focus moves to the first focusable element in `[data-nav-bar]`.

### Accessibility

- `role="status"` and `aria-label="Site announcement"` on the wrapper.
- Close button has `aria-label="Dismiss announcement"`.
- Arrow icon has `aria-hidden="true"`.

## Usage

```astro
---
import AnnouncementBanner from "../components/AnnouncementBanner.astro";
---

<!-- Linked banner -->
<AnnouncementBanner href="/blog/announcement" class="bg-gray-900 text-white text-sm">
  <span><strong>New:</strong> We just launched v2.0!</span>
</AnnouncementBanner>

<!-- Non-linked, non-dismissible -->
<AnnouncementBanner dismissible={false} class="bg-yellow-100 text-yellow-900">
  <span>Scheduled maintenance tonight at 10pm UTC</span>
</AnnouncementBanner>
```

## Notes

- Dismissal uses `sessionStorage`, so it resets when the browser session ends (not persistent across sessions).
- The banner is designed to be used inside `Nav.astro`, which positions it within the grid layout.
- The `height` transition is set via CSS (`transition: height 0.3s ease`).
