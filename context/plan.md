# Valentine's Day Website Implementation Plan (Refined)

## Overview
"Our Story, One Click at a Time" is an interactive, aesthetically pleasing digital experience designed to celebrate a relationship. The website aims to evoke emotion through beautiful visuals, thoughtful interactions, and personal memories, culminating in a playful "Will you be my Valentine?" proposal.

## Design Philosophy (Updated)
*   **Glassmorphism:** The core visual language. Translucent layers, soft shadows, and blurs to create depth and a premium feel.
*   **Emotional Hierarchy:** Typography and motion used to guide feelings, not just eyes.
*   **Micro-Interactions:** Every hover, click, and scroll has vivid feedback (magnetic buttons, custom cursor).
*   **Immersive Journey:** "Memory fog" reveals and 3D depth to make the experience tangible.

## Color Palette & Theme
*   **Base Colors:**
    *   `--blush-coral`: `#EA9975`
    *   `--soft-pink`: `#EEAAC0`
    *   `--vintage-lace`: `#BEC0E2`
    *   `--ruby-pop`: `#FEC082`
    *   `--cream-bg`: `#F8F5F2`
*   **Glassmorphism Tokens:**
    *   `--glass-white`: `rgba(255, 255, 255, 0.15)`
    *   `--glass-border`: `rgba(255, 255, 255, 0.25)`
    *   `--shadow-soft`: `rgba(234, 153, 117, 0.12)`
*   **Gradients:**
    *   `--gradient-sunset`: `linear-gradient(135deg, #EA9975 0%, #EEAAC0 100%)`
    *   `--gradient-dreamy`: `linear-gradient(120deg, #EEAAC0 0%, #BEC0E2 50%, #EA9975 100%)`

## Typography
*   **Primary Heading:** *Playfair Display* (Elegant serif)
*   **Secondary:** *Cormorant Garamond* (Romantic serif)
*   **Body:** *Inter* (Clean sans-serif)
*   **Handwritten:** *Nothing You Could Do* or *Caveat* (Warm, personal)
*   **Accents:** *Great Vibes* (for "Will you be my Valentine?")

## Core Experience Flow

### 0. Loading Screen
*   **Visual:** Glassmorphic card in absolute center.
*   **Animation:** Floating glass hearts background + Heart loader SVG.
*   **Text Cycle:** "Designing something special..." -> "Collecting our best moments..." -> "Adding extra sparkle..." -> "Almost there... ✨"
*   **Tech:** Real progress bar logic (or simulated smooth loader).

### 1. Landing Section: The Hook
*   **Layout:** Full-screen. Animated gradient background (`--gradient-dreamy`).
*   **Centerpiece:** Glassmorphic card.
*   **Typography:** "Do You Have [Gradient Text] Valentine's Plans?"
*   **Interaction:**
    *   **"YES" Button:** Magnetic effect. Hover fill animation (coral fills up).
    *   **"NO" Button:** Simple glass button.
*   **Response:**
    *   **If Yes:** "Can I compete with that? 👀" + Button: "See what I made for you..."
    *   **If No:** Immediate confetti burst. "Perfect timing... I have something to show you ✨" + Button.
*   **Transition:** Smooth scroll to next section.

### 2. "Moments That Made Me Fall" (Photo Timeline)
*   **Concept:** Horizontal scroll with "Memory Fog" reveal.
*   **Tech:** Framer Motion `useScroll`.
*   **Item Animation:**
    *   Starts blurred (`blur(10px)`), scaled down (`0.8`), and transparent.
    *   Comes into focus (`blur(0px)`, `scale(1)`), opacity 1 in center.
    *   Fades out/blurs again as it leaves.
*   **Design:** Glassmorphic photo frames with handwritten date stamps (absolute positioned) and subtle location pins. Caption reveals on hover with a gradient overlay.

### 3. "Our Firsts" (Memory Cards)
*   **Concept:** True 3D Flip Cards.
*   **Tech:** CSS `perspective: 1000px`, `transform-style: preserve-3d`.
*   **Card Design:**
    *   **Front:** Polaroid style (white matte, slight rotation, handwritten label).
    *   **Back:** Glassmorphic card, centered emotional text (*Cormorant Garamond*), heart icon.
*   **Interactivity:** Click to flip. Hover lifts the card (`translateY(-8px)`).

### 4. "The Question" (Grand Finale)
*   **Background:** High-quality couple photo with overlay (`cream-bg` fade).
*   **Micro-Interaction:** "Runaway" No Button.
    *   Hovering "Let me think..." moves it to a random position within bounds.
    *   After 3 attempts, it disables/changes text: "Fine, just click YES 😊".
    *   "Obviously Yes" button GROWS (`scale`) with each "No" attempt.
*   **Success:**
    *   Confetti explosion.
    *   Success Modal/Overlay: "I knew you'd say yes! ❤️"
    *   Details: Time, Place, "Wear that thing I like".

## Micro-Interactions & Polish
*   **Custom Cursor:** Trailing heart particles.
*   **Scroll Progress:** Top gradient bar indicating scroll position.
*   **Sound:** Optional soft click sounds and success chime.
*   **Lazy Loading:** `LazyMotion` for performance.

## Technical Implementation Plan

### Stack
*   **Framework:** Next.js 14+ (App Router)
*   **Styling:** Tailwind CSS + Custom Config (Glassmorphism utilities).
*   **Animations:** Framer Motion (heavy usage).
*   **Icons:** Lucide React.
*   **Confetti:** `canvas-confetti`.
*   **Fonts:** `next/font/google`.

### Tasks
1.  **Project Init:** Dependencies, Tailwind Config (Colors, Fonts, Drop-shadows).
2.  **Global Styles:** Glassmorphism utility classes, custom cursor.
3.  **Components:**
    *   `GlassCard`, `MagneticButton`.
    *   `LoadingScreen`.
    *   `TimelineItem` (Parallax logic).
    *   `FlipCard` (3D logic).
4.  **Pages:** Assemblage of sections.
5.  **Assets:** Placeholder images (will instruct user where to put real ones).

This plan effectively merges the original structure with the "Senior Designer" aesthetic upgrades.
