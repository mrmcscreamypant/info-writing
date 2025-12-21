import { Card, Separator, Text } from '@radix-ui/themes';
import React from 'react';
import './app-image.css';

export default function AppImage({ src, caption, credit, attributionLink }: { src: string, caption?: string, credit: React.JSX.Element, attributionLink?: string }): React.JSX.Element {
    const image = <img src={src} style={{ borderRadius: "var(--radius-6)" }} />;
    return <Card className='app-image'>
        {attributionLink ? <a target="_blank" href={attributionLink}>{image}</a> : image}
        <Text size={"1"}>{credit}</Text><br />
        <Separator size={"4"} />
        {caption && <Text size={"2"}>{caption}</Text>}
    </Card>;
}