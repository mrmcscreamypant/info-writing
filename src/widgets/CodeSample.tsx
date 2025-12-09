import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { v4 } from 'uuid';
import './code-sample.css';
import { AspectRatio, Box, Card } from '@radix-ui/themes';

monaco.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.typescript.JsxEmit.ReactJSX
});

monaco.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
});

export const enum CodeLanguage {
    JS = 'javascript',
    TS = 'typescript',
    PY = 'python'
}

export default function CodeSample({ content, language = CodeLanguage.PY, file }: { content: string, language?: CodeLanguage, file?: string }): React.JSX.Element {
    const uuid = v4();

    useEffect(() => {
        const elem = document.getElementById(uuid);
        const uri = file ? monaco.Uri.file(file) : null;
        let model;
        try {
            model = monaco.editor.createModel(content, language, uri);
        } catch (e) {
            model = monaco.editor.getModel(uri);
        }

        monaco.editor.create(elem, {
            readOnly: true,
            model: model,
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