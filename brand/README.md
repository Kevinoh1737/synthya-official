# Synthya 2026 Brand Assets

## Source

- Master supplied asset: `synthya-brand-guide-2026.png`
- Resolution: 1536 × 1024
- Color space: RGB
- The supplied source is raster and does not contain transparency.
- No vector master was available at the time of the website release.

## Web derivatives

- Light-background horizontal lockup:
  - `client/src/assets/images/synthya-brand-2026-horizontal.png`
- Dark-background horizontal lockup:
  - `client/src/assets/images/synthya-brand-2026-horizontal-reversed.png`
- Standalone symbol:
  - `client/src/assets/images/synthya-brand-2026-symbol.png`
- Browser favicon:
  - `client/public/favicon.png`
- Apple touch icon:
  - `client/public/apple-touch-icon.png`

## Derivation policy

- Derivatives preserve the pixels and proportions of the approved source.
- The white source background was converted to transparency with a deterministic luminance mask.
- The reversed lockup preserves the gradient symbol and recolors only the divider and wordmark to white.
- Do not redraw the symbol, substitute the wordmark with a font, or use generative image tools to recreate it.
- Do not enlarge these raster assets for large-format print.

## Brand colors

- Synthya Blue: `#2563EB`
- Synthya Purple: `#7C3AED`
- Synthya Navy: `#0B1324`

## Future master recommendation

If a vector master becomes available, replace the web derivatives with exports from that master while preserving the same lockup proportions. Recommended files:

- Primary horizontal SVG
- Reversed horizontal SVG
- Standalone symbol SVG
- Monochrome SVG
- Compact horizontal lockup without the divider
