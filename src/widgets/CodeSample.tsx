import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { v4 } from 'uuid';
import './code-sample.css';
import { AspectRatio, Card } from '@radix-ui/themes';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_, label): Worker {
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    }
};

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
        } catch {
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