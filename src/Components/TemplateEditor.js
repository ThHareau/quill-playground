import React, {forwardRef, useImperativeHandle, useRef} from "react";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'
import {VariableBlot} from './Blots/VariableBlot'

Quill.register('blots/embed', VariableBlot);

const formats = ["variable", "bold"] // add custom format name + any built-in formats you need

const TemplateEditor = (props, forwardedRef) => {
    const {text, onChange} = props
    const editorRef = useRef()

    useImperativeHandle(forwardedRef, () => ({
        variable: (variable) => {
            const quill = editorRef.current.getEditor()
            const range = quill.getSelection(true);

            quill.insertEmbed(range.index, 'variable', variable, Quill.sources.USER);
        }
    }))

    return (
        <ReactQuill theme="snow" value={text} onChange={onChange} formats={formats} ref={editorRef}/>
    );
}

export default forwardRef(TemplateEditor)