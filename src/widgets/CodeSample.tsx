import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { v4 } from 'uuid';
import './code-sample.css';
import { AspectRatio, Box } from '@radix-ui/themes';

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

export default function CodeSample({ content, language = CodeLanguage.PY, file = "_.py" }: { content: string, language?: CodeLanguage, file?: string }): React.JSX.Element {
    const uuid = v4();

    useEffect(() => {
        const elem = document.getElementById(uuid);
        const view = monaco.editor.create(elem, {
            readOnly: true,
            model: monaco.editor.createModel(content, language, monaco.Uri.file(file)),
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