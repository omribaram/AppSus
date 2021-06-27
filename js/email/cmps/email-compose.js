import { eventBus } from '../../services/event-bus-service.js';
import { utilService } from '../../services/util-service.js'

export default {
    props: ['parentEmail', 'note'],
    template: `
            <form @submit.prevent="composeEmail" class="email-compose">
                <div class="email-compose-header">
                    <span v-if="!parentEmail">New Email</span>
                    <span v-else>Reply</span>
                </div>
                <div class="email-compose-from">
                    To
                    <input class="input-email" v-model="email.to" type="email" required>
                </div>
                <div class="email-compose-subject">
                    Subject
                    <input class="input-email" ref="subject" v-model="email.subject" type="text" maxlength="50">
                </div>
                <div class="email-compose-style">
                        <select v-model="email.styleObject.fontFamily" class="email-compose-font-familty">
                                <option value="Arial">Arial</option>
                                <option value="Tahoma">Tahoma</option>
                        </select>
                    <span class="email-compose-style-size">
                        <span>
                            <img src="img/apps/email/size.png" @click="setStyle('size',-1)"/>
                            <sup>-</sup>
                        </span>
                        <span>
                            <img src="img/apps/email/size.png" @click="setStyle('size',1)"/>
                            <sup>+</sup>
                        </span>
                    </span>
                    <span class="email-compose-style-weight">
                        <img src="img/apps/email/weight.png" @click="setStyle('weight')"/>
                    </span>
                    <span class="email-compose-style-italic">
                        <img src="img/apps/email/italic.png" @click="setStyle('italic')"/>
                    </span>
                    <span class="email-compose-style-underline">
                        <img src="img/apps/email/underline.png" @click="setStyle('underline')"/>
                    </span>
                    <span class="email-compose-style-color" @click="setStyle('color')">
                        <input type="color" v-model="email.styleObject.color" class="input-email-compose-color">
                        <img src="img/apps/email/color.png"/>
                        <img src="img/apps/email/arrow.png"/>
                    </span>
                    <span class="email-compose-style-dir">
                        <img src="img/apps/email/dir.png" @click="setStyle('dir')"/>
                    </span>
                </div>
                <textarea v-model="email.body" v-bind:style="email.styleObject"></textarea>
                <button class="btn-email-send">Send</button>
            </form>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: '',
                sentAt: null,
                isStarred: false,
                isSent: false,
                isRead: false,
                isDeleted: false,
                styleObject: {
                    'font-size': '16px',
                    'font-weight': '',
                    'color': '',
                    'fontFamily': 'Tahoma',
                    'font-style': '',
                    'text-decoration': '',
                    'direction': ''
                }
            }
        }
    },
    mounted() {
        this.$refs.subject.focus();
        if (this.parentEmail) {
            this.email.to = this.parentEmail.from;
            if (this.parentEmail.replies) this.email.subject = `Re: ${this.parentEmail.replies[this.parentEmail.replies.length-1].subject}`;
            else this.email.subject = `Re: ${this.parentEmail.subject}`;
        } else if (this.note) {
            this.email.body = this.note.body;
            this.email.subject = this.note.subject
            if (this.note.image) this.email.body += `\n\n${this.note.image}`;
            else if (this.note.video) this.email.body += `\n\n${this.note.video}`;
            else if (this.note.todos) this.email.body += `\n\n${this.note.todos.map(todo=>todo.txt)}`;
        }
    },
    methods: {
        setStyle(style, value) {
            switch (style) {
                case 'size':
                    const currSize = +this.email.styleObject['font-size'].match(/(\d+)/)[0];
                    value === 1 ? this.email.styleObject['font-size'] = currSize + 1 + 'px' : this.email.styleObject['font-size'] = currSize + -1 + 'px';
                    break;
                case 'weight':
                    this.email.styleObject['font-weight'] === '' ? this.email.styleObject['font-weight'] = 'bold' : this.email.styleObject['font-weight'] = '';
                    break;
                case 'italic':
                    this.email.styleObject['font-style'] === '' ? this.email.styleObject['font-style'] = 'italic' : this.email.styleObject['font-style'] = '';
                    break;
                case 'underline':
                    this.email.styleObject['text-decoration'] === '' ? this.email.styleObject['text-decoration'] = 'underline' : this.email.styleObject['text-decoration'] = '';
                    break;
                case 'color':
                    document.querySelector('.input-email-compose-color').click()
                    break;
                case 'dir':
                    this.email.styleObject['direction'] === '' ? this.email.styleObject['direction'] = 'rtl' : this.email.styleObject['direction'] = '';
                    break;
            }

        },
        composeEmail() {
            console.log('hello')
            if (!this.email.body) {
                const msg = {
                    txt: 'Please enter email message',
                    type: 'error'
                };
                eventBus.$emit('show-msg', msg);
                return
            }

            if (this.parentEmail) {
                if (!this.parentEmail.replies) this.parentEmail.replies = []
                this.email.id = utilService.makeId()
                this.email.sentAt = Date.now();
                this.email.isSent = true;
                this.parentEmail.replies.push(this.email);
                this.$emit('emailReplied', this.parentEmail)
            } else if (this.note) {
                if (this.note.image) this.email.image = this.note.image;
                if (this.note.video) this.email.video = this.note.video;
                if (this.note.todos) this.email.todos = this.note.todos;
            }
            this.email.sentAt = Date.now();
            this.email.isSent = true;
            this.email.from = "omribaram@gmail.com";
            this.$emit('emailComposed', this.email)
        }
    },
    destroyed() {
        this.$emit('destroyed');
        if (this.note) this.$router.push('/email');
    }
}