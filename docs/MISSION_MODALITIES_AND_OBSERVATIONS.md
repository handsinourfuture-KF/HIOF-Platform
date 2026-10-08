# Explorer Lens — Mission Modality & Observation Contract (v0.1)

Status: Product requirement; **not implemented software**.

## Mission completeness
Every mission MUST provide meaningful opportunities for all four modalities:
- **Visual** — notice, compare, locate, discriminate.
- **Auditory** — listen, respond to speech, sounds or storytelling.
- **Hands-on / Movement** — manipulate, gesture, move or investigate real-world objects.
- **Analytical** — predict, compare relationships, solve or experiment.

The four opportunities can be interwoven rather than four separate tests. No fixed learning-style assignment, diagnostic claim, mastery threshold or punitive progression gate. Activities must support developmentally appropriate accommodations, nonverbal participation, assistive input and adult-supported offline alternatives.

## Data contract
Each activity defines:
- `mission_id`, `activity_id`, `content_version`, `concept`
- `modality_opportunities[]` (one or more of visual, auditory, hands_on, analytical)
- `interaction_modes[]` (tap, drag, voice_prompt, offline, adult_assisted, etc.)
- `observable_events[]` (explicitly instrumented, not inferred)
- `offline_alternative`, `accessibility_notes`

Each event includes:
- `event_id`, `session_id`, `activity_id`, `timestamp`, `event_type`, `source` (app or adult)
- `payload` limited to necessary non-sensitive interaction details; `content_version`
- `consent_context` and privacy retention classification
- No unconsented audio/video capture, no unnecessary location, no passive background surveillance.

Each adult observation includes:
- `session_id`, `observer_role`, `observed_action`, `context`, `support_provided`, `optional_follow_up`, `timestamp`
- Explicit separation of directly observed actions and tentative interpretation.

## Records and permissions
- Family account owns the household Explorer record and controls sharing.
- Educator sees only institution-authorized Explorer records and can add classroom-context notes.
- **No automatic family-to-school or school-to-family data transfer** without appropriate authorization and access policies.
- Child-facing UI never shows labels, grades, diagnoses, rankings, or mastery gates.
- Research and product analytics use appropriately permissioned, minimized, preferably de-identified records.

## Red Fuel example
- Visual: distinguish red objects among alternatives.
- Auditory: hear Aniyah's color-word and story prompts; optionally replay.
- Hands-on: move fuel crystals digitally or find red objects physically.
- Analytical: decide which objects contribute to fuel restoration, try and revise.
- Fuel tank is visibly incomplete until the red mission is completed; never lock out further exploration based on wrong answers.

## MVP acceptance criteria
1. Each mission definition declares all four modality opportunities; automated validation rejects incomplete missions.
2. Each activity has accessible alternative input or supported offline route.
3. App records only explicitly specified interactions with fictional Explorer test profiles until privacy readiness is verified.
4. Adult can review and add context to events without treating clicks as evidence of mastery.
5. Passport records participation and discovery without ranking or restricting access.
6. Family and educator views enforce role- and consent-based access.
7. An end-to-end fictional-profile test verifies activity → event → contextual note → authorized record view.
