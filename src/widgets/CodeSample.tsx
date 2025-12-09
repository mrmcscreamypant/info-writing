import React, { useEffect } from 'react';
import { editor } from 'monaco-editor';
import { v4 } from 'uuid';
import './code-sample.css';
import { AspectRatio, Box } from '@radix-ui/themes';

export const enum CodeLanguage {
    JS = 'javascript',
    TS = 'typescript',
    PY = 'python'
}

export default function CodeSample({ content, language = CodeLanguage.PY }: { content: string, language?: CodeLanguage }): React.JSX.Element {
    const uuid = v4();

    useEffect(() => {
        const elem = document.getElementById(uuid);
        const view = editor.create(elem, {
            value: content,
            readOnly: true,

            roundedSelection: true,
            scrollbar: {
                vertical: "hidden",
                alwaysConsumeMouseWheel: false
            },
            wordWrap: "on",
            minimap: {
                enabled: false
            },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            language: language,
            theme: "vs-dark",
        });
    }, []);

    return <AspectRatio ratio={2} ><Box id={uuid} className='code-sample' /></AspectRatio>;
}