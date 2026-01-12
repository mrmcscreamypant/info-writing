import { createRoot } from 'react-dom/client';
import { App } from './core/App';
export const rootElem = document.getElementById("root");
// Typescript likes to get a little grouchy without this:
if (!rootElem) { throw new Error("Could not find root element!"); }
const root = createRoot(rootElem);
root.render(<App />);