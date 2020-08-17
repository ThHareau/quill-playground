import React, {forwardRef, useRef, useImperativeHandle} from "react";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'

let InlineEmbed = Quill.import('blots/embed');

class VariableBlot extends InlineEmbed {
    static create(value) {
        let node = super.create(value);
        node.setAttribute('data-value', value);
        node.innerText = value

        return node
    }

    static value(domNode) {
        return domNode.getAttribute('data-value');
    }
}

VariableBlot.blotName = 'variable';
VariableBlot.tagName = 'span';
VariableBlot.className = 'ql-variable'

Quill.register('blots/embed', VariableBlot);

const formats = ["variable"] // add custom format name + any built-in formats you need

const Editor = (props, forwardedRef) => {
    const {text, onChange} = props
    const editorRef = useRef()

    useImperativeHandle(forwardedRef, () => ({
        variable: ({name}) => {
            const quill = editorRef.current.getEditor()
            let range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'variable', name, Quill.sources.USER);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
        }
    }))

    return (
        <ReactQuill theme="snow" value={text} onChange={onChange} formats={formats} ref={editorRef}/>
    );
}

export default forwardRef(Editor)