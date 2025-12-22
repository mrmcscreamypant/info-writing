import { AspectRatio, Card } from '@radix-ui/themes';
import react from 'react';

export const enum DesmosType {
    CALCULATOR = "calculator",
    GEOMETRY = "geometry",
}

export default function Desmos({ slug, type }: { slug: string, type: DesmosType }): React.JSX.Element {
    return <AspectRatio ratio={1.5}>
        <iframe src={`https://desmos.com/${type}/${slug}`} width="100%" height="100%" />
    </AspectRatio>;
}