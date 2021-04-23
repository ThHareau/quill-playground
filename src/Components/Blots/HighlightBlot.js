import {Quill} from 'react-quill'

const Inline = Quill.import("blots/inline");

class HighlightBlot extends Inline {
  static create(value) {
    const node = super.create(value);
    node.contentEditable = "false";
    return node;
  }
}

HighlightBlot.blotName = 'highlight';
HighlightBlot.className = 'ql-highlight';
HighlightBlot.tagName = 'mark';

export default HighlightBlot;
