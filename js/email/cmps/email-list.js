import emailPreview from './email-preview.js';
import emailSearch from '../cmps/email-search.js';

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <div>
            <div class="ham-menu-block"></div>
            <div class="email-search">
                <email-search @searched="onSearch"/>
            </div>
        </div>
        <ul v-if="emails.length>0" class="email-previews">
            <li v-for="email in emails" :key="email.id">
            <email-preview :email="email" @starred="onToggleStarred" @toggleread="onToggleRead" @click.native="onSelectEmail(email.id)"/>
            </li>
        </ul>
        <div v-else class="email-empty-list">Yay! You have no emails...</div>
    </section>
    `,
    methods: {
        onToggleStarred(email) {
            this.$emit('starred', email)
        },
        onToggleRead(email) {
            this.$emit('toggleread', email)
        },
        onSelectEmail(emailId) {
            this.$emit('selected', emailId);
        },
        onSearch(searchBy) {
            this.$emit('searched', searchBy);
        }
    },
    components: {
        emailPreview,
        emailSearch
    }
};