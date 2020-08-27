import {Quill} from 'react-quill'
import {t} from '../../Services/i18n'

const InlineEmbed = Quill.import('blots/embed');

export default class VariableBlot extends InlineEmbed {
    static create(variable) {
        const node = super.create(variable);

        Object.keys(variable).forEach((key) => {
            node.setAttribute(`data-${key}`, variable[key]);
        })

        node.innerText = t(variable.name)

        return node
    }

    static value(domNode) {
        return {name: domNode.getAttribute(`data-name`)}
    }
}

VariableBlot.blotName = 'variable';
VariableBlot.tagName = 'span';
VariableBlot.className = 'ql-variable'