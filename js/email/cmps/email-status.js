export default {
    props: ['emails'],
    template: `
    <div class="email-read-status">
        <span class="tooltip">
            <span>{{calcReadProgress()}}%</span>
            <span v-if="emails" class="email-read-state-tip">
                    {{((emails.length * calcReadProgress())/100).toFixed(0)}} read emails of total {{emails.length}} emails.
            </span>
        </span>
        <div class="email-read-status-progress" v-bind:style="{width: calcReadProgress() + '%'}"></div>
    </div>
    `,
    methods: {
        calcReadProgress() {
            let readCount = 0;
            let totalCount = 0;
            for (const idx in this.emails) {
                if (this.emails[idx].isRead) readCount++;
                totalCount++;
            }
            const progress = ((readCount / totalCount) * 100).toFixed(0);
            this.$emit('unread', totalCount - readCount);
            return !isNaN(progress) ? `${progress}` : '0'
        }
    },
}