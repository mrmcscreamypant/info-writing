import { createRoot } from 'react-dom/client';
import { App } from './core/App';

type BeforeInstallPromptEvent = { prompt: () => void } & Event;
let deferredPrompt: BeforeInstallPromptEvent;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    console.log(e);
});

window.addEventListener("click", () => { deferredPrompt.prompt(); });

const elem = document.getElementById("root");
if (!elem) { throw new Error("Could not find root element!"); }
const root = createRoot(elem);
root.render(<App />);