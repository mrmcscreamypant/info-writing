import { AspectRatio } from '@radix-ui/themes';
import React from 'react';
import Desmos

export const enum DesmosType {
    CALCULATOR = "calculator",
    GEOMETRY = "geometry",
    THREED = "3d",
}

const API_KEY = "8b3dceaf9fc446a38bf40c6e805cafd9";

export default function Desmos({ slug, type, embed }: { slug: string, type: DesmosType, embed?: boolean }): React.JSX.Element {
    return <AspectRatio ratio={1.5}>
        <iframe src={`https://desmos.com/${type}/${slug}${embed ? '?embed' : ''}`} width="100%" height="100%" />
    </AspectRatio>;
}