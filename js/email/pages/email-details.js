import { i18nService } from '../../services/i18n-service.js';
import { eventBus } from '../../services/event-bus-service.js';
import { emailService } from '../services/email-service.js';
import emailCompose from '../cmps/email-compose.js'

export default {
    props: ['email'],
    template: `
            <section v-if="email" class="email-details">
                <span>{{email.subject}}</span>
                <div class="email-subject">
                    <div>
                        <img src="img/apps/email/user.png" class="email-details-user-img">
                        <div class="email-details-to-from">
                            <span>{{email.from}}</span>
                            <span>to {{email.to==='omribaram@gmail.com' ? 'me' : email.to}}</span>
                        </div>
                    </div>
                    <div>
                        <span>{{showFormattedTime}}</span>
                        <span @click="onSendNote" class="email-send-note" title="Send to Ms. Keep">
                            <span></span>
                        </span>
                        <span v-if="!email.isDeleted" @click="onToggleReply" class="email-reply" title="Reply">
                            <img src="img/apps/email/reply.png">
                        </span>
                        <span v-if="email.isDeleted" @click="onDeleteEmail('restore')" class="email-restore">
                            <img src="img/apps/email/restore.png" title="Restore Email">
                        </span>
                        <span @click="onDeleteEmail" class="email-delete">
                            <img src="img/apps/email/delete.png" title="Mark as Deleted">
                        </span>
                    </div>
                </div>
                <div class="email-body" v-bind:style="email.styleObject">
                    {{email.body}}
                    <img v-if="email.image" v-bind:src="email.image" class="email-body-image"/>
                    <div v-if="email.video" class="email-body-video">
                        <iframe v-if="email.video.includes('youtube')" width="320" height="240" v-bind:src="showYoutubeLink"></iframe>
                        <video v-if="!email.video.includes('youtube')" width="320" height="240" controls="controls">
                            <source v-bind:src="email.video">
                        </video>
                    </div>
                    <div v-if="email.todos">
                        <ul class="email-body-todos">
                            <li v-for="todo in email.todos" :key="todo.id">
                                <div>{{todo.txt}}<span v-if="todo.isMarked">Completed</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <email-compose v-if="isReplying" :parentEmail="email" @emailReplied="reply"/>
                <ul v-if="email.replies" class="email-replies">
                    <li v-for="reply in email.replies.slice().reverse()" :key="reply.id">
                        <section class="email-details">
                            <span>{{reply.subject}}</span>
                            <div class="email-subject">
                                <div>
                                    <span>{{showFormattedTime}}</span>
                                    <span @click="onDeleteEmail('reply', reply.id)" class="email-delete">
                                        <img src="img/apps/email/delete.png">
                                    </span>
                                </div>
                            </div>    
                            <div class="email-body" v-bind:style="reply.styleObject">{{reply.body}}</div>
                        </section>
                    </li>
                </ul>
            </section>
            <section class="email-details" v-else>
                <div class="email-body no-content"><span>No selected email</span></div>
            </section>
    `,
    data() {
        return {
            paramEmail: null,
            isReplying: false
        }
    },
    created() {},
    mounted() {},
    methods: {
        onDeleteEmail(type, replyId) {
            if (type === 'reply') this.$emit('replyDeleted', replyId);
            else if (type === 'restore') this.$emit('emailRestored', this.email.id);
            else this.$emit('emailDeleted', this.email.id);
        },
        onToggleReply() {
            this.isReplying = !this.isReplying;
        },
        reply(email) {
            emailService.save(email);
            this.$emit('emailReplied', this.email.id);
            this.onToggleReply();
            const msg = {
                txt: 'Reply has been sent successfully',
                type: 'success'
            };
            eventBus.$emit('show-msg', msg);
        },
        onSendNote() {
            this.$router.push({
                name: 'emailToNote',
                params: { email: this.email }
            })
        }
    },
    computed: {
        showFormattedTime() {
            return new Date(this.email.sentAt).toLocaleDateString('en-il', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        },
        showYoutubeLink() {
            const ytLink = this.email.video.split('=');
            const idYT = ytLink[1];
            return `https://www.youtube.com/embed/${idYT}`;
        }
    },
    components: {
        emailService,
        emailCompose
    }
}