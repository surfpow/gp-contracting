/**
 * Shared motion constants. Mirror CSS `--ease-out` in `app/globals.css`.
 * Framer Motion needs the cubic-bezier as a number tuple; CSS transitions
 * should use `var(--ease-out)`.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Press / micro-interaction feedback (100–160ms budget). */
export const DURATION_PRESS_S = 0.15;

/** UI chrome: dropdowns, chevrons, small panels. */
export const DURATION_UI_S = 0.2;

/** Marketing section / hero entrances. */
export const DURATION_MARKETING_S = 0.4;

/** Stagger between marketing children (30–80ms band). */
export const STAGGER_MARKETING_S = 0.05;
