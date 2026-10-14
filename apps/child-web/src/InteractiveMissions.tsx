import React, { useEffect, useState } from 'react';
import './interactive.css';

type Color = 'red' | 'blue' | 'yellow';
type Kind = 'collect' | 'maze' | 'match' | 'world' | 'build' | 'choose' | 'paint';
type Activity = { id: string; title: string; kind: Kind; instruction: string; modality: ('visual'|'auditory'|'hands_on'|'analytical')[] };
type Mission = { color: Color; title: string; intro: string; activities: Activity[] };
type Event = { at: string; activity: string; action: string; detail?: string };
type State = { completed: string[]; stamps: Color[]; events: Event[] };
const KEY = 'explorer-lens-interactive-demo-v2';
const initial: State = { completed: [], stamps: [], events: [] };
const missions: Mission[] = [
 { color:'red', title:'Restore the Red Fuel Tank', intro:'The spaceship beeps! Aniyah and Ann discover that the red fuel tank is empty.', activities:[
  {id:'red-collect',title:'Power Shapes',kind:'collect',instruction:'Collect the red power shapes to help repair the ship.',modality:['visual','hands_on']},
  {id:'red-maze',title:'Red Crystal Maze',kind:'maze',instruction:'Help Aniyah follow the glowing path to the red fuel crystal.',modality:['visual','analytical','hands_on']},
  {id:'red-match',title:'Super Red Ship Parts',kind:'match',instruction:'Find matching red parts to make the spaceship faster.',modality:['visual','analytical','hands_on']},
  {id:'red-world',title:'My Red Discovery',kind:'world',instruction:'Look around you. Find, point to, or show something red.',modality:['auditory','hands_on','visual']}
 ]},
 { color:'blue', title:'Cross the Blue Space Bridge', intro:'The ship reaches a moon covered in rocks. A broken blue bridge leads to the fuel station.', activities:[
  {id:'blue-collect',title:'Blue Moon Rocks',kind:'collect',instruction:'Collect the blue moon rocks among the colorful rocks.',modality:['visual','hands_on']},
  {id:'blue-build',title:'Blue Space Bridge',kind:'build',instruction:'Place blue bridge pieces to help Aniyah cross.',modality:['analytical','hands_on','visual']},
  {id:'blue-world',title:'Blue Fuel Discovery',kind:'world',instruction:'Find or point to something blue around you, then fill the fuel tank.',modality:['auditory','hands_on','visual']}
 ]},
 { color:'yellow', title:'Light the Yellow Star', intro:'A nearby star has dimmed. Ann spots a yellow crystal that could bring back its glow.', activities:[
  {id:'yellow-choose',title:'Choose the Space Suit',kind:'choose',instruction:'Choose the suit holding the yellow crystal.',modality:['visual','analytical']},
  {id:'yellow-paint',title:'Color the Star',kind:'paint',instruction:'Give the star its yellow glow.',modality:['visual','hands_on']},
  {id:'yellow-build',title:'Restore the Star',kind:'build',instruction:'Use yellow energy pieces to brighten the star.',modality:['analytical','hands_on','auditory']}
 ]}
];
const tiles = ['red','blue','yellow','red','purple','red','blue','yellow','red'];
const route = [0,1,4,7,8]; // fixed five-step traversable route, other cells remain exploratory
function read():State { try {const p=JSON.parse(localStorage.getItem(KEY)||'null');if(p&&Array.isArray(p.completed)&&Array.isArray(p.stamps)&&Array.isArray(p.events))return p;}catch{}return initial; }
export default function InteractiveMissions(){
 const [state,setState]=useState<State>(read);
 const [mi,setMi]=useState(0),[ai,setAi]=useState(0),[picked,setPicked]=useState<number[]>([]),[step,setStep]=useState(0),[pairs,setPairs]=useState<string[]>([]),[selection,setSelection]=useState<string|null>(null),[note,setNote]=useState(''),[adult,setAdult]=useState(false),[observation,setObservation]=useState(''),[feedback,setFeedback]=useState('');
 const mission=missions[mi],activity=mission.activities[ai],done=state.completed.includes(activity.id);
 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(state));},[state]);
 const event=(action:string,detail?:string)=>setState(s=>({...s,events:[...s.events,{at:new Date().toISOString(),activity:activity.id,action,detail}]}));
 const complete=(message:string)=>{setFeedback(message);setState(s=>({...s,completed:s.completed.includes(activity.id)?s.completed:[...s.completed,activity.id],events:[...s.events,{at:new Date().toISOString(),activity:activity.id,action:'completed'}]}));};
 const navigate=(m:number,a:number)=>{setMi(m);setAi(a);setPicked([]);setStep(0);setPairs([]);setSelection(null);setFeedback('');};
 const missionDone=mission.activities.every(a=>state.completed.includes(a.id));
 const stamp=()=>{setState(s=>({...s,stamps:s.stamps.includes(mission.color)?s.stamps:[...s.stamps,mission.color]}));setFeedback('Explorer Passport stamped! You helped the adventure move forward.');};
 const speak=()=>{event('audio_prompt');if('speechSynthesis'in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(activity.instruction);u.rate=.85;window.speechSynthesis.speak(u);}else setFeedback('Ask a grown-up to read the mission aloud.');};
 const collect=(index:number)=>{if(picked.includes(index))return;const next=[...picked,index];if(tiles[index]===mission.color){setPicked(next);event('selected_color',tiles[index]);if(next.filter(i=>tiles[i]===mission.color).length===tiles.filter(t=>t===mission.color).length)complete('You found the '+mission.color+' pieces! The ship responds with a happy glow.');}else{event('explored_alternative',tiles[index]);setFeedback('Interesting choice! Look around for '+mission.color+'.');}};
 const maze=(index:number)=>{if(index===route[step]){const next=step+1;setStep(next);event('maze_step',String(index));if(next===route.length)complete('You reached the red crystal! The fuel tank lights up.');else setFeedback('Keep exploring the glowing trail!');}else{event('maze_exploration',String(index));setFeedback('That path is a detour. Try another way!');}};
 const matching=(value:string)=>{if(!selection){setSelection(value);event('match_first',value);return;}const next=[...pairs];if(selection===value){if(!next.includes(value))next.push(value);setPairs(next);event('match_pair',value);if(next.length===3)complete('Three matching red pairs! Super red parts boost the ship.');}else{event('match_retry',selection+' / '+value);setFeedback('Those parts look different. Try another pair.');}setSelection(null);};
 const build=(value:string)=>{if(value!==mission.color){event('explored_alternative',value);setFeedback('That is a different color. Find '+mission.color+' for this mission.');return;}const next=picked.length+1;setPicked(p=>[...p,next]);event('placed_piece',value);if(next>=3)complete(mission.color==='blue'?'The blue bridge is ready! Aniyah crosses safely.':'The yellow star shines again!');};
 const exportData=()=>{const blob=new Blob([JSON.stringify({fictionalDemo:true,...state,adultNote:observation},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='explorer-lens-fictional-events.json';a.click();URL.revokeObjectURL(url);};
 return <main className="adventure"><header><small>HANDS IN OUR FUTURE · EXPLORER LENS</small><h1>🚀 Aniyah’s Adventures</h1><p>Colors in Space · Interactive mission prototype · Fictional Explorer</p></header>
 <nav aria-label="Color missions">{missions.map((m,i)=><button key={m.color} aria-current={i===mi?'step':undefined} onClick={()=>navigate(i,0)}>{m.color.toUpperCase()} {state.stamps.includes(m.color)?'★':''}</button>)}<button onClick={()=>setAdult(v=>!v)}>{adult?'Return to adventure':'Adult observation'}</button></nav>
 {adult?<section className="panel"><h2>Adult observation preview</h2><p>These are interaction records, not diagnoses or evidence of mastery. Fictional profiles only.</p><p>Completed activities: {state.completed.length} / {missions.reduce((n,m)=>n+m.activities.length,0)} · Passport stamps: {state.stamps.length}</p><label htmlFor="note">Optional contextual observation</label><textarea id="note" value={observation} onChange={e=>setObservation(e.target.value)} placeholder="What did you directly observe? What support was offered?"/><button onClick={exportData}>Export fictional record</button><ul>{state.events.slice(-30).reverse().map((e,i)=><li key={i}>{e.activity}: {e.action}{e.detail?' ('+e.detail+')':''}</li>)}</ul><button onClick={()=>{if(window.confirm('Reset fictional demo progress?')){setState(initial);navigate(0,0);}}}>Reset fictional demo</button></section>:
 <>
 <section className={'stage '+mission.color}><div className="stars">✦　·　✧　·　✦</div><div className={'animated-ship '+(done?'boost':'')} aria-label="Spaceship moving through space" role="img">🛸</div><div className="explorers"><span>👧🏾 Aniyah</span><span>👧🏽 Ann</span></div><h2>{mission.title}</h2><p>{mission.intro}</p><div className="fuel-meter" aria-label="Activities explored">{mission.activities.map(a=><span key={a.id} className={state.completed.includes(a.id)?'lit':''}>◆</span>)}</div></section>
 <section className="panel"><div className="mission-nav">{mission.activities.map((a,i)=><button key={a.id} className={i===ai?'current':''} onClick={()=>navigate(mi,i)}>{i+1}. {a.title} {state.completed.includes(a.id)?'✓':''}</button>)}</div><h2>{activity.title}</h2><p>{activity.instruction}</p><button className="audio" onClick={speak}>🔊 Hear the clue</button>
 {activity.kind==='collect'&&<div className="tile-grid">{tiles.map((c,i)=><button key={i} className={'color-tile '+c+(picked.includes(i)?' found':'')} aria-label={c+' item'} onClick={()=>collect(i)} disabled={picked.includes(i)}>{c===mission.color?'◆':'●'}</button>)}</div>}
 {activity.kind==='maze'&&<div><p>Follow the path from 🚀 to the red crystal ◆. Tap the next connected square.</p><div className="maze-grid">{Array.from({length:9},(_,i)=><button key={i} className={i===route[step]?'next-step':i===route[0]?'start':''} onClick={()=>maze(i)} aria-label={'Maze square '+(i+1)}>{i===0?'🚀':i===8?'🔴':route.slice(0,step).includes(i)?'✨':'·'}</button>)}</div></div>}
 {activity.kind==='match'&&<><p>Choose a part, then find its matching twin.</p><div className="match-grid">{['🚀','⚙️','🔋','⚙️','🔋','🚀'].map((v,i)=><button key={i} disabled={pairs.includes(v)} className={selection===v?'selected':''} onClick={()=>matching(v)}>{pairs.includes(v)?'✓':v}</button>)}</div></>}
 {activity.kind==='world'&&<div className="world-activity"><p>Explore your room with a grown-up. Point, find, describe, or simply observe something {mission.color}.</p><button onClick={()=>{event('offline_discovery','adult-supported');complete('Your '+mission.color+' discovery is part of the adventure!');}}>I explored something {mission.color}</button><button onClick={()=>{event('adult_supported','observation');complete('Observing and exploring together counts, too!');}}>We explored together</button></div>}
 {activity.kind==='build'&&<div className="build-activity"><p>Place three {mission.color} pieces. Choose a piece to attach it.</p><div className="build-slots">{[0,1,2].map(i=><span key={i} className={i<picked.length?'placed':''}>{i<picked.length?'◆':'◇'}</span>)}</div>{(['red','blue','yellow'] as Color[]).map(c=><button key={c} className={'piece '+c} onClick={()=>build(c)} disabled={done}>{c} ◆</button>)}</div>}
 {activity.kind==='choose'&&<div className="suit-options">{['purple','red','yellow'].map(c=><button key={c} onClick={()=>{event('suit_choice',c);if(c==='yellow')complete('The yellow suit holds the glowing crystal!');else setFeedback('Explore another suit. Which one has yellow?');}}>{c==='purple'?'🟣':c==='red'?'🔴':'🟡'} {c} suit</button>)}</div>}
 {activity.kind==='paint'&&<div className="paint-star"><div className={'star-preview '+(done?'shining':'')}>★</div><button onClick={()=>{event('star_colored','yellow');complete('You made the star shine yellow!');}}>Paint the star yellow</button></div>}
 <div className="feedback" role="status" aria-live="polite">{feedback}</div><div className="next-actions">{done&&ai<mission.activities.length-1&&<button onClick={()=>navigate(mi,ai+1)}>Next discovery →</button>}{missionDone&&!state.stamps.includes(mission.color)&&<button onClick={stamp}>★ Add {mission.color} stamp to Passport</button>}{missionDone&&mi<missions.length-1&&<button onClick={()=>navigate(mi+1,0)}>Travel to {missions[mi+1].color} →</button>}</div></section>
 <section className="panel"><h2>Explorer Passport</h2><div className="passport-stamps">{missions.map(m=><span key={m.color}>{state.stamps.includes(m.color)?'★':'☆'} {m.color}</span>)}</div>{state.stamps.length===3&&<strong>🎉 You explored Red, Blue and Yellow! More worlds await.</strong>}</section>
 </>}
 <footer>Prototype: simplified illustrations, fictional local records, no real child data. Participation is never graded or blocked.</footer></main>;
}
