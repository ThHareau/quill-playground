import {Quill} from 'react-quill'

const InlineEmbed = Quill.import('blots/embed');

export default class InputBlot extends InlineEmbed {
    static create(input) {
        const node = super.create(input);

        const { name, displayName } = input

        node.setAttribute('data-name', name);
        node.setAttribute('data-display-name', displayName);

        node.innerText = displayName

        return node
    }

    static value(domNode) {
        const getAttribute = (attribute) => domNode.getAttribute(`data-${attribute}`)
        return {name: getAttribute('name'), displayName: getAttribute('display-name')}
    }
}

InputBlot.blotName = 'input';
InputBlot.tagName = 'span';
InputBlot.className = 'ql-input'
