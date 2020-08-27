import {Quill} from 'react-quill'
import InputBlot from '../Blots/InputBlot'

export default class TabNavigator {
    constructor(quill) {
        this.quill = quill
        quill.keyboard.bindings[9].unshift({
            key: 9,
            handler: ({index, length}) => {
                const leaf = this.findNextBlotOfType([InputBlot], index + length + 1)

                if (leaf) {
                    quill.setSelection(leaf.offset(quill.scroll), 1, Quill.sources.USER)
                    return false
                }

                return true
            }
        })
    }

    findNextBlotOfType(blots, firstIndex = 0) {
        const [leaf] = this.quill.getLeaf(firstIndex)

        if (!leaf) return leaf

        if (blots.find((blot) => leaf instanceof blot)) {
            return leaf
        }

        return this.findNextBlotOfType(blots, firstIndex + 1)
    }
}