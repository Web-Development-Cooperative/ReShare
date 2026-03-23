import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import '@shared/assets/styles/reset.css';
import '@shared/assets/styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
