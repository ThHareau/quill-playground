import ReactQuill, {Quill} from 'react-quill'
import React, {useEffect, useRef} from 'react'
import HighlightBlot from './Blots/HighlightBlot'

class Searcher {
  constructor(quill) {
    this.quill = quill;
  }

  shouldSearch (value) {
    const totalText = this.quill.getText();

    return totalText.match(value)
  }

  findMatches (value) {
    const totalText = this.quill.getText();

    const regexp = RegExp(value,'gi');

    const matches = Array.from(totalText.matchAll(regexp)).map((match) => ({index: match.index, length: match[0].length}))

    return matches
  }

  search (value) {
    //  remove any previous search
    if (value) {
      const matches = this.findMatches(value)
      matches.forEach(({index, length}) => {
        this.quill.formatText(index, length, 'highlight', true)
      })
    }
  }
}

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

  return <ReactQuill ref={ref} value={text} readOnly theme="bubble" formats={formats} modules={{searcher: true}}/>
}

export default RichTextViewer
