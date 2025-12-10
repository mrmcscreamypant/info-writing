import { createRoot } from 'react-dom/client';
import { App } from './core/App';

const elem = document.getElementById("root");
if (!elem) { throw new Error("Could not find root element!"); }
const root = createRoot(elem);
root.render(<App />);