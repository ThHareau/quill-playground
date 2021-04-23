export class Searcher {
    constructor(quill) {
        this.quill = quill;
    }

    findMatches(value) {
        const totalText = this.quill.getText();

        const regexp = RegExp(value, 'gi');

        return Array.from(totalText.matchAll(regexp)).map((match) => ({
            index: match.index,
            length: match[0].length
        }))
    }

    search(value) {
        //  remove any previous search
        if (value) {
            const matches = this.findMatches(value)
            matches.forEach(({index, length}) => {
                this.quill.formatText(index, length, 'highlight', true)
            })
        }
    }
}
