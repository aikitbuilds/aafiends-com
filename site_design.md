# AAFiends - Operator Dashboard Site Design System

This document outlines the core design philosophy, UI/UX elements, color palettes, and structural components of the AAFiends platform. It serves as a master prompt and reference guide for replicating this specific aesthetic (e.g., for Ubuild.pro or other future projects).

## 1. Core Aesthetic: "Operator Dashboard"
*   **Vibe:** Tactical, highly advanced, cybernetic, raw, and authentic. 
*   **Theme:** Dark mode exclusively. The interface should feel like a highly secure, classified command terminal used by network operators or system architects.
*   **Tone:** Zero corporate BS. Direct, mission-critical, and data-driven (e.g., "Baseline Telemetry", "Admin Password", "Sync Baseline").

## 2. Color Palette
The design relies on deep, dark backgrounds to make glowing, vibrant accents pop, simulating neon terminal outputs.

*   **Backgrounds:** 
    *   Primary: True Black (`bg-[#050505]`, `bg-[#020202]`)
    *   Secondary/Cards: Charcoal/Dark Grey (`bg-[#0a0a0a]`, `bg-[#09090b]`)
*   **Text Colors:**
    *   Primary: Crisp White (`text-white`, `text-neutral-100`)
    *   Secondary: Muted Grey for descriptions (`text-neutral-400`, `text-neutral-500`)
*   **Accents (The "Terminal" Glow):**
    *   *System/Data:* Terminal Green (`#10b981` / `emerald-500`)
    *   *Security/Admin:* Electric Blue (`#3b82f6` / `blue-500`)
    *   *Network/Community:* Deep Purple (`#a855f7` / `purple-500`)
    *   *Alerts/Threats:* Alert Red (`#ef4444` / `red-500`)
    *   *Special/Patches:* Amber/Gold (`#f59e0b` / `amber-500`)
    *   *Action Buttons:* Glowing Orange (`bg-orange-500` with shadow glow)

## 3. Typography
*   **Primary Font:** `Inter` (sans-serif) for clean, readable body text and headings.
*   **Secondary Font:** `JetBrains Mono` (monospace) for technical labels, system alerts, badges, and metadata to reinforce the "terminal" feel.
*   **Styling:**
    *   Headings are heavily weighted (`font-black`), tightly tracked (`tracking-tight`), and strictly `uppercase`.
    *   Badges and micro-copy are small (`text-xs` or `text-sm`), `font-mono`, `uppercase`, and widely tracked (`tracking-widest`).

## 4. UI/UX Elements
*   **Borders & Cards:** Thin, subtle borders (`border-white/10`) on charcoal backgrounds. Hover states illuminate the border with the section's accent color (e.g., `hover:border-[#10b981]/50`).
*   **Corner Radii:** Extremely rounded corners on structural cards (`rounded-[2rem]` or `rounded-3xl`) contrasted with sharper, smaller UI buttons (`rounded-xl` or `rounded-full`).
*   **Glows & Shadows:** Use colored drop shadows to simulate LED glows. Example: `shadow-[0_0_15px_rgba(249,115,22,0.5)]`.
*   **Animations:** Smooth, delayed fade-ins and upward slides using `framer-motion`. Hover states on images include a slow, subtle zoom (`hover:scale-105 duration-700`).

## 5. Image Creation Prompts
When generating or sourcing images for this design system, use these keywords to maintain consistency:
*   *Base Prompt:* "Tech-noir, operator dashboard aesthetic. Dark mode, charcoal and true black background. Cinematic lighting, mysterious, highly advanced, cybernetic. Raw, authentic."
*   *Adding Color:* Specify glowing neon accents (e.g., "electric blue and terminal green glowing accents").
*   *Image Treatment:* Images in the UI should be placed inside `aspect-[4/5]` or `aspect-[4/3]` rounded containers with a bottom-to-top black gradient overlay (`bg-gradient-to-t from-black/90 via-black/20 to-transparent`) so white text can be overlaid cleanly at the bottom.

## 6. Structural Components

### Navigation (SiteHeader)
*   **Style:** Sticky, blurred dark background (`bg-[#051024]` with `border-b border-white/5`).
*   **Logo:** Greyscale/muted, placed next to a heavy, two-tone text logo (e.g., `AA` in white, `fiends` in green).
*   **Links:** Uppercase, widely tracked, small font. Hover states change to the primary accent color.
*   **Login Button:** A vibrant, glowing button that stands out against the dark nav (e.g., Orange with a glowing drop shadow).

### Hero Section
*   **Layout:** Centered, high-impact text.
*   **Badges:** Monospace alert badges sitting above the main `h1`. (e.g., `[ System Status: Active ]`).
*   **Typography:** Massive, uppercase, `font-black` leading text.

### The "Poem / Log" Section (Content Block)
*   **Style:** Instead of standard text blocks, important narrative text is formatted like a digital log or poem.
*   **Container:** `bg-gradient-to-r` fading into transparency, with a thick left border indicating the accent color. `backdrop-blur-sm` for depth.
*   **Text:** `italic`, `font-serif` or standard `sans`, slightly faded (`text-neutral-200`) with generous line height (`leading-relaxed`).

### Footer (SiteFooter)
*   **Layout:** 3-column grid (Brand info, Navigation Directory, Legal/Disclaimer).
*   **Bottom Bar:** Separated by a thin border (`border-white/5`). Contains copyright and a signature line: *"Built with sweat, tears, and cheers by [YourBrand]"*. 
*   **Styling:** Monospace, uppercase, heavily muted (`opacity-60`), utilizing accent colored links with tactical underlines (`underline decoration-white/30 underline-offset-4`).
