import { i18nService } from "../../services/i18n-service.js";
import longText from '../../cmps/long-text.js';

export default {
    props: ['email'],
    components: {
        longText
    },
    template: `
        <div class="email-preview">
            <div class="email-preview-top">
                <span v-bind:class="classStarredState" @click.stop="onToggleStarred" title="Mark Star/Unstarred"></span>
                <long-text class="email-preview-subject" :txt="email.subject" :length="50" :class="showReadState"></long-text>
                <div class="email-preview-read-state" v-bind:class="showReadState" @click.stop="onToggleRead" title="Mark Read/Unread"></div>
                <div class="email-preview-send-date" :class="showReadState">{{showFormattedTime}}</div>
            </div>
            <long-text class="email-preview-body" :txt="email.body" :length="60" :class="showReadState"></long-text>
        </div>
    `,
    methods: {
        onToggleStarred() {
            this.$emit('starred', this.email)
        },
        onToggleRead() {
            this.$emit('toggleread', this.email)
        }
    },
    computed: {
        showFormattedTime() {
            return new Date(this.email.sentAt).toLocaleDateString('en-il');
        },
        showReadState() {
            return !this.email.isRead ? 'unread' : ''
        },
        classStarredState() {
            return this.email.isStarred ? 'email-preview-star-state yellow' : 'email-preview-star-state white'
        }
    }
};