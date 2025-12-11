import { Card, Text } from '@radix-ui/themes';
import React from 'react';
import './app-image.css';

export default function AppImage({ src, caption, credit }: { src: string, caption?: string, credit: string }): React.JSX.Element {
    return <Card className='app-image'>
        <img src={src} />
        <Text size={"1"}>{credit}</Text><br />
        {caption && <Text size={"2"}>{caption}</Text>}
    </Card>;
}