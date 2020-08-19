import {Quill} from 'react-quill'

const Parchment = Quill.import('parchment')


export class EmbedSelector {
    constructor(quill, options) {
        quill.root.addEventListener('click', (ev) => {
            let input = Parchment.find(ev.target, true);

            if (options.blots?.find((blot) => input instanceof blot)) {
                switch (options.action) {
                    case 'right':
                        return quill.setSelection(input.offset(quill.scroll) + 1, Quill.sources.USER);
                    case 'select':
                    default:
                        return quill.setSelection(input.offset(quill.scroll), 1, Quill.sources.USER);
                }
            }
        });
    }
}

