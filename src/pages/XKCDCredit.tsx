import React from 'react';
import { Text } from '@radix-ui/themes';

export default function XKCDCredit(): React.JSX.Element {
    return <Text>
        Comic by Randall Munroe, xkcd.com<br />
        <a href="https://creativecommons.org/licenses/by-nc/2.5/" target="_blank">
            (Creative Commons Attribution-NonCommercial 2.5)
        </a>
    </Text>;
}