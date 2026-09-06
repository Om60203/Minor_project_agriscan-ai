# Design Brief

## Direction

Verdant Intelligence — a premium AI crop-disease detection platform where botanical greens, glassmorphism, ambient glow, and layered leaf textures meet a confident, tech-forward startup aesthetic.

## Tone

Refined botanical-tech: deep forest greens with a warm gold "AI intelligence" accent, layered gradient atmospheres, glass surfaces, and choreographed motion — premium and trustworthy, never toy-like.

## Differentiation

The "living leaf" identity — a botanical green core with a warm gold neural accent, ambient glow orbs, leaf-texture overlays, and glassmorphic cards that make disease analysis feel alive, precise, and effortless.

## Color Palette

| Token      | OKLCH (light)     | OKLCH (dark)      | Role                           |
| ---------- | ----------------- | ----------------- | ------------------------------ |
| background | 0.99 0.01 148     | 0.13 0.02 155     | soft green-tinted off-white / forest black |
| foreground | 0.18 0.03 155     | 0.93 0.01 150     | deep forest text               |
| card       | 0.995 0.008 150   | 0.17 0.024 155    | elevated surface               |
| primary    | 0.48 0.17 152     | 0.7 0.19 152      | vivid botanical green (CTAs)   |
| accent     | 0.72 0.13 85      | 0.72 0.13 85      | warm gold (AI/active states)   |
| muted      | 0.945 0.02 150    | 0.21 0.028 155    | secondary surface              |
| success    | 0.55 0.17 150     | 0.62 0.17 150     | healthy / positive diagnosis   |
| destructive| 0.55 0.22 25      | 0.55 0.22 25      | severe disease / errors        |

## Typography

- Display: Space Grotesk — hero, headings, section titles
- Body: DM Sans — paragraphs, UI labels, navigation
- Mono: Geist Mono — confidence scores, technical data
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base lg:text-lg`

## Elevation & Depth

Three-tier surface hierarchy (background → card → elevated) with soft green-tinted shadows (`shadow-subtle`, `shadow-elevated`, `shadow-elevated-lg`), glassmorphic panels (`glass`, `glass-strong`) for the upload zone, and ambient glow orbs (`glow-leaf`, `glow-gold`) for atmosphere without full-page fills.

## Structural Zones

| Zone    | Background              | Border   | Notes                                   |
| ------- | ----------------------- | -------- | --------------------------------------- |
| Header  | glass / card            | border-b | sticky, translucent blur, brand mark    |
| Hero    | bg-ambient + texture-leaf | —      | layered gradient, glow orbs, leaf texture |
| Content | bg-background           | —        | alternate bg-muted/30 for feature bands |
| Footer  | bg-muted/40             | border-t | muted surface, link columns             |

## Spacing & Rhythm

Section gaps `py-20 md:py-28`, content max-w-7xl container, cards `gap-6`, micro-spacing `space-y-3`; generous vertical rhythm with tight heading tracking for premium feel.

## Component Patterns

- Buttons: rounded-full pills; primary uses `bg-gradient-primary` with hover lift; secondary outlined; accent reserved for AI actions
- Cards: `rounded-2xl` glass or card surface, `shadow-subtle`, hover `shadow-elevated` + translate; entrance via `animate-card-swipe`
- Badges: rounded-full pill; success green for healthy, destructive red for severe, gold for AI confidence

## Motion

- Entrance: `card-swipe` (0.7s) for scan/history/library cards, staggered `reveal-up` (0.8s) on home section scroll-reveal
- Hover: cards lift + shadow deepen, buttons lift (0.3s transition-smooth)
- Decorative: `float` for hero leaf visual, `drift` for ambient glow orbs, `pulse-ring` for scan/recording states, `scan-progress` shimmer on analysis

## Constraints

- Token-only styling — no raw hex/rgb in components
- AA+ contrast in both light and dark modes
- Fully responsive mobile-first (sm/md/lg)
- Do NOT build voice-based AI chat or video upload diagnosis

## Signature Detail

The "living leaf" ambient background — layered green gradient, drifting glow orbs, and a subtle leaf-texture overlay behind glassmorphic cards that makes the whole app feel like a breathing, intelligent ecosystem.
