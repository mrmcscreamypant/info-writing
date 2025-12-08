import React from "react";
import Engine from "./Engine";

import './background.css';

export default function Background(): React.JSX.Element {
    React.useEffect(() => { new Engine("background"); });

    return <canvas id="background"></canvas>;
}