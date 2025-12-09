import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { v4 } from 'uuid';
import './code-sample.css';
import { AspectRatio, Card } from '@radix-ui/themes';

export const enum CodeLanguage {
    JS = 'javascript',
    TS = 'typescript',
    PY = 'python'
}

export default function CodeSample({ content, language = CodeLanguage.PY, file = "_.py" }: { content: string, language?: CodeLanguage, file?: string }): React.JSX.Element {
    const uuid = v4();

    useEffect(() => {
        const elem = document.getElementById(uuid);

        monaco.editor.create(elem, {
            readOnly: true,
            language: language,
            value: content,
            roundedSelection: true,
            scrollbar: {
                vertical: "hidden",
                alwaysConsumeMouseWheel: false
            },
            minimap: {
                enabled: false
            },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            theme: "vs-dark",
        });
    }, []);

    return <AspectRatio ratio={1.5} ><Card id={uuid} className='code-sample' /></AspectRatio>;
}