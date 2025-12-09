import React from "react";
import Engine, { EngineHooks } from "./Engine";

import './background.css';

export default function Background({ engineHooks }: { engineHooks: EngineHooks }): React.JSX.Element {
    const getEngineHooks = (): EngineHooks => engineHooks;

    const [engine, setEngine] = React.useState<Engine>();

    React.useEffect(() => {
        setEngine(new Engine("background", getEngineHooks));
    }, []);

    React.useEffect(() => {
        if (engine) {
            engine.switchContext(engineHooks.currentPage);
        }
    }, [engineHooks.currentPage, engine]);

    return <canvas id="background"></canvas>;
}