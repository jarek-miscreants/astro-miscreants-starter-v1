# CardFeatured

**File:** `src/components/CardFeatured.astro`

## What it does

A content card with an eyebrow label, title, description, optional icon, and optional media slot (image, video, etc. that bleeds to the card bottom).

## Props

| Prop          | Type                                  | Default | Description                                |
|---------------|---------------------------------------|---------|--------------------------------------------|
| `eyebrow`     | `string`                              | —       | Small label above the title                |
| `title`       | `string`                              | —       | Card heading (renders as `<h3>` with `h4` size) |
| `description` | `string`                              | —       | Body text below the title                  |
| `border`      | `"all" \| "y" \| "x" \| "none"`      | `"all"` | Which borders to show (using `border-grid-border`) |
| `class`       | `string`                              | `""`    | Additional classes on the outer div        |

## Named slots

| Slot    | Purpose                                                    |
|---------|------------------------------------------------------------|
| `icon`  | Icon displayed next to the eyebrow label                   |
| `media` | Media content (image, screenshot) that bleeds to the bottom edge |

## How it works

- When the `media` slot has content, bottom padding is removed (`pb-0`) so the media can sit flush against the card bottom.
- When no media is present, `pb-8` is applied for consistent spacing.
- The border prop maps to Tailwind border classes using `border-grid-border` color.

## Usage

```astro
---
import CardFeatured from "../components/CardFeatured.astro";
---

<!-- Card with media -->
<CardFeatured
  eyebrow="Schema Builder"
  title="Design content structures your way."
  description="Full control with a streamlined, API-first experience."
  border="all"
>
  <svg slot="icon" class="w-4 h-4">...</svg>
  <img slot="media" src="/screenshot.png" alt="Schema builder interface" />
</CardFeatured>

<!-- Card without media -->
<CardFeatured
  eyebrow="API"
  title="Build faster with our REST API."
  description="Simple, well-documented endpoints."
  border="y"
/>
```

## Notes

- The card does not include a link — wrap it with `Clickable` if the entire card should be clickable.
- `Astro.slots.has("media")` is used at build time to conditionally adjust padding.
