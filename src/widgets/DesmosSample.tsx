import { AspectRatio } from '@radix-ui/themes';
import "https://www.desmos.com/api/v1.11/calculator.js?apiKey=8b3dceaf9fc446a38bf40c6e805cafd9";
import React from 'react';
import { v4 } from 'uuid';

export const enum DesmosType {
    CALCULATOR = "calculator",
    GEOMETRY = "geometry",
    THREED = "3d",
}

export default function DesmosSample({ slug, type, embed }: { slug: string, type: DesmosType, embed?: boolean }): React.JSX.Element {
    const uuid = v4();

    React.useEffect(() => {
        const elem = document.getElementById(uuid);
        let calculator;
        switch (type) {
            case (DesmosType.CALCULATOR):
                calculator = Desmos.GraphingCalculator(elem);
                break;
            case (DesmosType.GEOMETRY):
                calculator = Desmos.Geometry(elem);
                break;
            case (DesmosType.THREED):
                calculator = Desmos.Calculator3D(elem);
        }
    }, []);

    return <AspectRatio ratio={1.5}>
        {embed ?
            <iframe src={`https://desmos.com/${type}/${slug}?embed`} width="100%" height="100%" />
            : <div id={uuid} style={{ width: "100%", height: "100%" }} />
        }
    </AspectRatio>;
}