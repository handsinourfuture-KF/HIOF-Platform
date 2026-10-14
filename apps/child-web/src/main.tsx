import React from 'react';
import { createRoot } from 'react-dom/client';
import InteractiveMissions from './InteractiveMissions';
import './style.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><InteractiveMissions /></React.StrictMode>);
