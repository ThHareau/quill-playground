import React, {forwardRef, useImperativeHandle, useRef} from "react";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'
import VariableBlot from './Blots/VariableBlot'
import InputBlot from './Blots/InputBlot'
import EmbedSelector from './Modules/EmbedSelector'

Quill.register('blots/embed', VariableBlot);
Quill.register('blots/embed', InputBlot);
Quill.register('modules/embedSelector', EmbedSelector);

const formats = ["variable", "bold", 'input', "list"] // add custom format name + any built-in formats you need

const TemplateEditor = ({text, onChange}, forwardedRef) => {
    const editorRef = useRef()

    const quillAction = (type) => (value) => {
        const quill = editorRef.current.getEditor()
        const range = quill.getSelection(true)

        quill.insertEmbed(range.index, type, value, Quill.sources.USER)
        quill.setSelection(range.index + 1, Quill.sources.SILENT)
    }

    useImperativeHandle(forwardedRef, () => ({
        variable: quillAction('variable'),
        input: quillAction('input')
    }))

    return (
        <ReactQuill theme="snow" value={text} onChange={onChange} formats={formats} ref={editorRef} modules={{
            embedSelector: {
                blots: [InputBlot, VariableBlot],
                action: 'right',
            }
        }
        }/>
    );
}

export default forwardRef(TemplateEditor)