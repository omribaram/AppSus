export default {
    props: ['txt', 'length'],
    template: `
                <p>
                    {{txtForDisplay}}
                </p>
            `,
    computed: {
        txtForDisplay() {
            if (this.txt.length <= this.length) return this.txt
            return this.txt.substring(0, +this.length) + '...'
        }
    }
};