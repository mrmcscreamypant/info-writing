import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
    base: "https://mrmcscreamypant.github.io/info-writing/",
    plugins: [monacoEditorPlugin({ publicPath: "/info-writing" })]
});