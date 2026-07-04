# AAfiends Phase 1 (Priority Alpha) Roadmap Tracker

## Step 1: Initialize Progress Tracker & Environment
- [x] Create checklist.md with a checklist format for all tasks
- [x] Document required environment variables in .env.example (flag GEMINI_API_KEY and FIREBASE_SERVICE_ACCOUNT_KEY)
      *Outcome: Created checklist.md. Added placeholders to .env.example and securely added actual Gemini key to local .env.*

## Step 2: Perimeter Security & Authentication
- [x] Implement standard Google Auth (SSO) login workflow using Firebase Authentication
- [x] Deploy strict Firebase Firestore security rules (request.auth.uid == userId)
      *Outcome: Verified existing AuthContext SSO. Updated firestore.rules to cascade strict security to private_vault subcollections.*

## Step 3: The AI Mirror Engine (Backend API Route)
- [x] Build a serverless Next.js API route (`app/api/mirror/route.ts`)
- [x] Integrate Google Gemini API using `@google/generative-ai` SDK
- [x] Configure Gemini system prompt for strict JSON schema (theWhy, gentleAlerts, reliefPlan)
      *Outcome: Created lib/gemini.ts and app/api/mirror/route.ts. Schema enforced.*

## Step 4: The Data Loop (Firestore Integration)
- [x] Securely write Gemini JSON payload directly to the authenticated user's Firestore document
- [x] Write to sub-collection: `users/{userId}/private_vault/telemetry`
      *Outcome: Integrated firebase-admin to securely verify tokens and write to the exact path requested.*

## Step 5: End-to-End Test Preparation
- [x] Create a hidden developer testing component to verify text -> API -> Firestore flow
      *Outcome: Created VanguardTest.tsx (a hidden floating panel accessible via a tiny [DEV] button in the bottom right corner).*

## Phase 2: Priority Bravo (The Trench Test & Diagnostic)

## Step 1: Mobile UI Hardening (The Trench Test)
- [x] Run End-to-End (E2E) mobile responsiveness audit on the existing 3-Step Guided Dashboard (Input, Processing, Output)
- [x] Ensure all padding, margins, and text scaling are perfectly optimized for mobile viewports
      *Outcome: Adjusted dashboard layout to stack gracefully on mobile. Resized indicator circles, improved header flexbox spacing, and added responsive font sizing.*

## Step 2: The Visual Diagnostic Wizard (Frontend UI)
- [x] Build the post-authentication onboarding flow (12-question AIV Diagnostic)
- [x] Render one question at a time (prevent cognitive overload)
- [x] Format multiple-choice answers as 2x2 grid of touch-friendly square cards (icon + 2-4 words)
- [x] Implement auto-advance logic upon tapping a card
- [x] Include "Skip for now, take me to the dashboard" escape hatch

## Step 3: Phase 3.5 (Data Finalization & Firestore Write)
- [x] Build "Calibrating Your Dashboard" final screen
- [x] Include mobile-friendly Date Picker for "Confirm Sobriety Date (Required)"
- [x] Include text input for "Sponsor's Name / Emergency Contact (Optional)"
- [x] Write diagnostic answers and Phase 3.5 data to `diagnosticData` object in user's profile document

## Step 4: The Global Vocabulary Toggle
- [x] Implement global React Context state (`VocabularyContext`) controlled by a toggle switch in the main header
- [x] Switch UI text globally between "Standard Mode" and "RaceFiends Mode" without page reload
- [x] Map terms: Early Recovery <-> The Deficit, Daily Check-in <-> Telemetry Log, Mental Obsession <-> The Doom-Loop, The Fellowship <-> The Grid

## Phase 3: Priority Charlie (Visualizing the Deficit)

## Step 1: The Garmin Telemetry Simulator (Backend/Scripting)
- [x] Write a "Simulate Garmin Data" hidden developer button in the dashboard
- [x] Inject 21 days of dummy biological telemetry into the authenticated user's `private_vault/telemetry`
- [x] Include metrics: Resting Heart Rate (RHR), Heart Rate Variability (HRV), and total sleep hours
      *Outcome: Created `GarminSimulator.tsx` and modified `/api/garmin/sync` to batch inject 21 days of inversely correlated hardware/software telemetry into Firestore.*

## Step 2: The Ledger Visualization (Frontend UI)
- [x] Build "The Ledger" charting component within the main user dashboard to visualize telemetry
- [x] Implement dual-axis line chart (Recharts) mapping Physical Hardware (Sleep, HRV) vs Mental Software (Pain, Cravings)
- [x] Show inverse correlation clearly
- [x] Maintain dark-mode "Operator Dashboard" aesthetic (blacks, terminal green, alert red)
      *Outcome: Rewrote LedgerTab.tsx to use Recharts, dynamically pulling from private_vault to map HRV/Sleep against Pain/Cravings with custom dark-mode tooltips and axes.*

## Step 3: AIVirus.org Mitigation Library Integration
- [x] Establish data schema (Threat Profile, System Failure, Mitigation Protocol, Result) for Tally.so -> Notion
- [x] Configure UI component on `aivirus.org` to fetch and render logs in a "Bento Grid" layout
      *Outcome: Wrote tally_notion_schema.json and built TrenchRepository.tsx with a tactical Bento Grid, dropping it into the live aivirus.org page.tsx.*
