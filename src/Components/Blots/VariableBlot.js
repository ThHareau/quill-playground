import {Quill} from 'react-quill'

const InlineEmbed = Quill.import('blots/embed');

export class VariableBlot extends InlineEmbed {
    static create(variable) {
        let node = super.create(variable);

        Object.keys(variable).forEach((key) => {
            node.setAttribute(`data-${key}`, variable[key]);
        })

        node.innerText = variable.displayName || variable.name

        return node
    }

    static value(domNode) {
        return ['displayName', 'name']
            .filter((key) => domNode.hasAttribute(`data-${key}`))
            .reduce((carry, key) => ({...carry, [key]: domNode.getAttribute(`data-${key}`)}), {})

    }
}

VariableBlot.blotName = 'variable';
VariableBlot.tagName = 'span';
VariableBlot.className = 'ql-variable'