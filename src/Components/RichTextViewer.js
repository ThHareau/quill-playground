import ReactQuill, {Quill} from 'react-quill'
import React, {useEffect, useRef} from 'react'
import HighlightBlot from './Blots/HighlightBlot'
import { Searcher } from "./Modules/Searcher";

Quill.register("modules/searcher", Searcher);
Quill.register(HighlightBlot);

const formats = ["bold", "list", "italic", "highlight"] // add custom format name + any built-in formats you need

const RichTextViewer = ({text, search}) => {
  const ref = useRef()

  useEffect(() => {
    const quill = ref.current?.getEditor()
    const searcher = quill.getModule('searcher')
    searcher.search(search)
  }, [search])

  return <ReactQuill ref={ref} value={text} readOnly theme={null} formats={formats} modules={{ searcher: true }}/>
}

export default RichTextViewer
