import React from "react";
import Engine, { EngineHooks } from "./Engine";

import './background.css';

export default function Background({ engineHooks }: { engineHooks: EngineHooks }): React.JSX.Element {
    const getEngineHooks = (): EngineHooks => engineHooks;

    React.useEffect(() => {
        new Engine("background", () => getEngineHooks());
    }, []);

    return <canvas id="background"></canvas>;
}