# Explorer Lens — November 24 Funding Prototype: Production Contract

Status: working specification for the feature branch; not a claim that features are implemented.

## Demonstration promise
A child helps Aniyah and Ann complete one continuous Colors in Space adventure (Red → Blue → Yellow). The child can contribute by noticing, listening, manipulating, or reasoning. Every contribution causes an observable response from a character or the world. Adults can review engagement events without labeling children.

## Experience loop
**Story problem → invitation to help → child action → character reaction → world state change → next opportunity.**

No isolated quiz screens. A child may retry, revisit, observe, or accept adult support without failing out of the adventure.

## Red — restore the fuel tank (reference-quality sequence)
1. **Arrival:** spaceship loses power. Aniyah checks controls, Ann notices a blinking red indicator. The child is invited to help.
2. **Explore:** optional paths: spot a red glow among objects (visual); follow a repeating red-fuel signal (auditory, with captions/replay); move red components to the tank (hands-on, tap alternative); trace a connected path to the crystal or troubleshoot an energy circuit (analytical).
3. **Response:** Aniyah looks toward the selected object, reacts to a discovered part, and physically installs the crystal with the child's assistance. Distinct short responses for correct discovery, exploratory attempt, revisit, and adult-supported completion.
4. **Payoff:** red tank fills, dashboard lights change, ship lifts off, a Red discovery stamp is offered. Blue planet appears as the next story beat.

The four pathways are **affordances**, not rigid sequential stations. A single action may involve multiple modalities. Avoid recording fixed 'learning styles.'

## Blue — repair the space bridge
- Different environment and problem: gather blue moon rocks, align movable bridge segments, interpret a rhythmic beacon, notice blue structural markers, and test which path connects.
- Consequence: bridge assembles piece-by-piece and Aniyah crosses it. Blue stamp after participation.

## Yellow — relight the star
- Different environment and problem: notice the yellow crystal suit, interpret the star's pulsing clue, drag/tap yellow energy to star nodes, and reason about the power sequence.
- Consequence: star lights up, ship moves onward, yellow stamp, teaser for the next adventure.

## Minimum animation asset contract
Create a reusable Aniyah and Ann visual style guide before commissioning animation. Preserve Aniyah's afro puff and glowing star/name patch; Ann is taller with long curly hair. Approve assets before integrating.
- Character poses: idle, notice, point, think, celebrate, ask-for-help.
- Ship states: normal, power-loss, red-tank partial, repaired, takeoff.
- Environmental states: red crystal hidden/found, blue bridge broken/repaired, yellow star dim/bright.
- Every animation should be triggerable from a named gameplay event, not baked into a fixed video.
- Keep layers and editable masters suitable for reuse in future YouTube episodes; gameplay animations and long-form video require distinct exports.

## Event contract (prototype only; no real child profile)
- mission_started, opportunity_opened, opportunity_selected
- object_inspected, clue_replayed, object_moved, route_attempted
- attempt_revisited, adult_support_recorded
- world_state_changed, mission_participated, passport_stamped
Each event records anonymous demo session ID, mission, opportunity, timestamp, action, and optional context. Do not infer mastery or identity from a single event. Keep local-only in prototype unless consent architecture is implemented.

## Acceptance criteria for a funding demo
- A first-time observer can follow Red → Blue → Yellow without explanation.
- Each color has a distinct story problem and visibly different environmental payoff.
- Red includes at least one working interaction in each of four pathways, with replay/alternative input.
- Aniyah or Ann responds meaningfully to child action; at least one scene changes visibly as a direct consequence.
- Participation and adult support permit progression; no assessment gate.
- Adult view demonstrates a chronological anonymous interaction history.
- Prototype can be demonstrated without network access and with a fallback for missing audio.
- A 5–10-minute scripted walkthrough plus a short captured video are prepared.
- Testing log distinguishes implemented features, known gaps, and aspirational animation.

## Funding vs. product scope
**Build now:** one polished Red scene, distinct Blue/Yellow samples, observable cause-and-effect, anonymous observation demo, Passport stamps, presentation and demo video.
**Fund later:** full animated episodes, production character rigs, robust accessibility testing, family accounts, portable Passport identity, dashboards, analytics validation, scalable content management.

## Animation/marketing handoff after prototype
Prepare reusable character art, voice direction, backgrounds, story bible, and shot list during prototype work. After prototype stability, commission a short Colors animation pilot for YouTube and bundle use. Track parent-directed product-page traffic and book/bundle conversion separately from video views. Avoid assuming that video views prove demand.

## Next engineering tasks
1. Audit current app build and run an actual browser test.
2. Replace fixed maze path with navigable branches and clear stateful feedback.
3. Add event-driven character reaction states to Red, even with placeholder artwork.
4. Add multiple optional modality pathways for the same Red story problem.
5. Reuse the engine for distinct Blue and Yellow state changes.
6. Prepare anonymous adult observation panel and evidence capture.
