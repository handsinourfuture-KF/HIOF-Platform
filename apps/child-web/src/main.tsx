import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type Color = 'red' | 'blue' | 'yellow';
type Mode = 'visual' | 'auditory' | 'hands_on' | 'analytical';
type Activity = { id: string; label: string; mode: Mode; prompt: string; options: string[]; answer: string; success: string };
type Mission = { color: Color; title: string; scene: string; activities: Activity[] };
type Event = { activityId: string; eventType: 'choice' | 'retry' | 'completed' | 'replay'; choice?: string; timestamp: string };
type Progress = { completed: string[]; events: Event[]; stamps: Color[] };
const STORAGE_KEY = 'explorer-lens-fictional-demo-v1';
const missions: Mission[] = [
  { color: 'red', title: 'Restore the Red Fuel Tank', scene: 'The ship needs red fuel crystals to launch!', activities: [
    { id: 'red-look', label: 'Find the fuel', mode: 'visual', prompt: 'Which crystal is RED?', options: ['🔴 Red crystal', '🔵 Blue crystal', '🟡 Yellow crystal'], answer: '🔴 Red crystal', success: 'A red crystal glows in the fuel tank!' },
    { id: 'red-listen', label: 'Hear the clue', mode: 'auditory', prompt: 'Listen to Aniyah’s clue. Which color did she say?', options: ['Blue', 'Red', 'Yellow'], answer: 'Red', success: 'You heard red! The ship hums to life.' },
    { id: 'red-build', label: 'Load the fuel', mode: 'hands_on', prompt: 'Choose the RED part to place on the ship.', options: ['🟡 Yellow wing', '🔴 Red booster', '🔵 Blue wheel'], answer: '🔴 Red booster', success: 'The red booster is attached!' },
    { id: 'red-think', label: 'Solve the route', mode: 'analytical', prompt: 'The red crystal belongs in which matching dock?', options: ['🔵 Blue dock', '🔴 Red dock', '🟡 Yellow dock'], answer: '🔴 Red dock', success: 'The red route is ready!' }
  ] },
  { color: 'blue', title: 'Cross the Blue Bridge', scene: 'Blue lights flicker across a bridge in space.', activities: [
    { id: 'blue-look', label: 'Spot the pieces', mode: 'visual', prompt: 'Which piece is BLUE?', options: ['🟡 Yellow tile', '🔵 Blue tile', '🔴 Red tile'], answer: '🔵 Blue tile', success: 'A blue bridge tile lights up!' },
    { id: 'blue-listen', label: 'Hear the signal', mode: 'auditory', prompt: 'Listen to Ann’s signal. Which color did she say?', options: ['Blue', 'Yellow', 'Red'], answer: 'Blue', success: 'The blue signal is received!' },
    { id: 'blue-build', label: 'Repair the bridge', mode: 'hands_on', prompt: 'Choose the BLUE beam to repair the bridge.', options: ['🔴 Red beam', '🟡 Yellow beam', '🔵 Blue beam'], answer: '🔵 Blue beam', success: 'The blue beam locks into place!' },
    { id: 'blue-think', label: 'Choose the path', mode: 'analytical', prompt: 'The bridge has blue markers. Which path matches?', options: ['🔵 Blue path', '🟡 Yellow path', '🔴 Red path'], answer: '🔵 Blue path', success: 'You found the blue route!' }
  ] },
  { color: 'yellow', title: 'Light the Yellow Star', scene: 'A sleepy star needs a little yellow light.', activities: [
    { id: 'yellow-look', label: 'Choose the suit', mode: 'visual', prompt: 'Which suit has the YELLOW crystal?', options: ['🟣 Purple suit', '🔴 Red suit', '🟡 Yellow suit'], answer: '🟡 Yellow suit', success: 'The yellow crystal shines!' },
    { id: 'yellow-listen', label: 'Hear the star', mode: 'auditory', prompt: 'Listen to Aniyah’s clue. Which color did she say?', options: ['Yellow', 'Blue', 'Red'], answer: 'Yellow', success: 'The yellow star twinkles!' },
    { id: 'yellow-build', label: 'Power the star', mode: 'hands_on', prompt: 'Choose the YELLOW energy piece.', options: ['🔵 Blue piece', '🟡 Yellow piece', '🔴 Red piece'], answer: '🟡 Yellow piece', success: 'The yellow energy piece fits!' },
    { id: 'yellow-think', label: 'Finish the pattern', mode: 'analytical', prompt: 'Yellow, red, yellow, red… what comes next?', options: ['🔵 Blue', '🟡 Yellow', '🔴 Red'], answer: '🟡 Yellow', success: 'You discovered the pattern!' }
  ] }
];
const initial: Progress = { completed: [], events: [], stamps: [] };
function load(): Progress { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); if (saved && Array.isArray(saved.completed) && Array.isArray(saved.events) && Array.isArray(saved.stamps)) return saved; } catch {} return initial; }
function App() {
  const [progress, setProgress] = useState<Progress>(load);
  const [missionIndex, setMissionIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [adult, setAdult] = useState(false);
  const mission = missions[missionIndex];
  const log = (event: Event, complete?: string) => setProgress(p => ({ ...p, completed: complete && !p.completed.includes(complete) ? [...p.completed, complete] : p.completed, events: [...p.events, event] }));
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { const done = mission.activities.every(a => progress.completed.includes(a.id)); if (done && !progress.stamps.includes(mission.color)) setProgress(p => ({ ...p, stamps: [...p.stamps, mission.color] })); }, [mission, progress]);
  const speak = (text: string, activityId: string) => { log({ activityId, eventType: 'replay', timestamp: new Date().toISOString() }); if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)); } else setFeedback('Audio is unavailable. An adult can read the clue aloud.'); };
  const choose = (a: Activity, choice: string) => {
    const correct = choice === a.answer;
    log({ activityId: a.id, eventType: correct ? 'completed' : 'retry', choice, timestamp: new Date().toISOString() }, correct ? a.id : undefined);
    setFeedback(correct ? a.success : 'That was an interesting try! Explore another choice, or try again.');
  };
  const exportDemo = () => { const blob = new Blob([JSON.stringify({ fictionalProfile: true, progress }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'explorer-lens-fictional-demo.json'; link.click(); URL.revokeObjectURL(url); };
  return <main>
    <header><div className="eyebrow">HANDS IN OUR FUTURE · FICTIONAL EXPLORER DEMO</div><h1>🚀 Aniyah’s Adventures</h1><p>Colors in Space · Explore, discover, and help the ship!</p></header>
    <nav aria-label="Adventure destinations">{missions.map((m,i) => <button key={m.color} className={i === missionIndex ? 'active' : ''} onClick={() => { setMissionIndex(i); setFeedback(''); }}>{m.color.toUpperCase()} {progress.stamps.includes(m.color) ? '★' : ''}</button>)}<button onClick={() => setAdult(v => !v)}>{adult ? 'Back to adventure' : 'Adult view'}</button></nav>
    {adult ? <section className="panel"><h2>Explorer Lens · Observation preview</h2><p>Fictional profile only. Choices show interactions, not proof of mastery or a fixed learning style.</p><p>Activities explored: {progress.completed.length} / 12 · Passport stamps: {progress.stamps.length} / 3</p><h3>Recorded interactions</h3><ul>{progress.events.slice(-20).reverse().map((e,i) => <li key={i}>{new Date(e.timestamp).toLocaleTimeString()} · {e.activityId} · {e.eventType}{e.choice ? ' · ' + e.choice : ''}</li>)}</ul><button onClick={exportDemo}>Export fictional activity events</button><button className="secondary" onClick={() => { if (window.confirm('Reset fictional demo progress?')) { setProgress(initial); setFeedback(''); } }}>Reset fictional demo</button></section> :
    <><section className={'scene ' + mission.color}><div className="stars">✦ · ✧ · ✦</div><div className="ship" role="img" aria-label="Cartoon spaceship">🛸</div><div className="characters"><span>👧🏾 Aniyah</span><span>👧🏽 Ann</span></div><h2>{mission.title}</h2><p>{mission.scene}</p><div className="fuel" aria-label="Mission progress">{mission.activities.map(a => <span key={a.id} className={progress.completed.includes(a.id) ? 'filled' : ''}>◆</span>)}</div></section>
    <section className="panel"><h2>Choose your next discovery</h2><p>You can explore in any order. There are no grades or wrong turns.</p><div className="activities">{mission.activities.map(a => <article key={a.id}><div className="mode">{a.mode.replace('_',' ')}</div><h3>{a.label} {progress.completed.includes(a.id) ? '✓' : ''}</h3><p>{a.prompt}</p>{a.mode === 'auditory' && <button className="listen" onClick={() => speak('Find the color ' + mission.color + '.', a.id)}>🔊 Play Aniyah’s clue</button>}<div className="choices">{a.options.map(option => <button key={option} onClick={() => choose(a,option)}>{option}</button>)}</div></article>)}</div><div aria-live="polite" className="feedback">{feedback}</div></section>
    <section className="panel passport"><h2>Explorer Passport</h2><p>Every discovery belongs to your journey.</p><div className="stamps">{missions.map(m => <span key={m.color} className={progress.stamps.includes(m.color) ? 'earned ' + m.color : ''}>{progress.stamps.includes(m.color) ? '★' : '☆'} {m.color}</span>)}</div>{progress.stamps.length === 3 && <p className="celebrate">🎉 Adventure complete! More worlds are waiting to be discovered.</p>}</section></>}
    <footer>Prototype only · No real child accounts, recording, or cloud data collection · Physical exploration is always welcome.</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
