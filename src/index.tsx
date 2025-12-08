import React from 'react';
import { createRoot } from 'react-dom/client';

function App(): React.JSX.Element {
    return <h1>Testing Testing 123</h1>;
}

const elem = document.getElementById("root");
if (!elem) { throw new Error("Could not find root element!"); }
const root = createRoot(elem);
root.render(<App />);