import { emailService } from '../services/email-service.js';
import { eventBus } from '../../services/event-bus-service.js';
import emailList from '../cmps/email-list.js';
import emailNav from '../cmps/email-nav.js';
import emailDetails from './email-details.js';
import emailSearch from '../cmps/email-search.js';
import emailCompose from '../cmps/email-compose.js';

export default {
    template: `
        <section v-if="emails" class="email-app">
            <email-nav @compose="isComposingEmail = true" :emails="emails" @sorted="setSort" @navigate="setSearch"/>
            <email-list v-if="emailsToShow" :emails="emailsToShow" @searched="setSearch" @selected="showEmail" @starred="toggleStarred" @toggleread="toggleRead"/>
            <email-details :email="selectedEmail" @emailDeleted="deleteEmail" @emailRestored="restoreEmail" @emailReplied="loadEmails()" @replyDeleted="deleteReply"/>
            <div v-if="isComposingEmail" class="modal-container" @click.self="isComposingEmail = false">
                <email-compose class="modal-content" @emailComposed="composeEmail" @destroyed="note=null" :note="note"/></email-compose>
            </div>
        </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null,
            searchBy: {
                route: 'inbox',
                txt: '',
                isRead: false,
                isUnread: false
            },
            sortBy: 'date',
            isComposingEmail: false,
            note: null
        };
    },
    created() {},
    mounted() {
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            return emailService.query().then((emails) => {
                this.emails = this.sortEmails(emails);
            });
        },
        sortEmails(emails) {
            if (this.sortBy === 'date')
                return emails.sort((a, b) => {
                    return b.sentAt - a.sentAt;
                });
            else if (this.sortBy === 'subject')
                return emails.sort((a, b) => {
                    return a.subject > b.subject ?
                        1 :
                        a.subject < b.subject ?
                        -1 :
                        0;
                });
        },
        showEmail(emailId) {
            if (!emailId) return this.selectedEmail = null;
            emailService.getById(emailId).then((email) => {
                this.markRead(email);
                this.selectedEmail = email;
            });
        },
        composeEmail(email) {
            emailService.save(email).then(() => {
                this.loadEmails();
                const msg = {
                    txt: 'Email has been sent successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
            this.isComposingEmail = false;
        },
        deleteReply(replyId) {
            emailService.getById(this.selectedEmail.id).then((email) => {
                const idx = email.replies.findIndex((reply) => {
                    return reply.id === replyId;
                });
                email.replies.splice(idx, 1);
                emailService.save(email).then((email) => {
                    this.selectedEmail = email;
                });
                const msg = {
                    txt: 'Reply has been deleted successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
        },
        deleteEmail(emailId) {
            const idx = this.emailsToShow.findIndex(email => email.id === emailId)
            const nextEmailId = idx === 0 && this.emailsToShow[idx + 1] ? this.emailsToShow[1].id :
                idx === 0 && !this.emailsToShow[idx + 1] ? null : this.emailsToShow[idx - 1].id;
            switch (this.emailsToShow[idx].isDeleted) {
                case false:
                    const email = this.emailsToShow[idx];
                    email.isDeleted = true;
                    emailService.save(email)
                        .then(email => {
                            this.showEmail(nextEmailId)
                            const msg = {
                                txt: 'Email has been marked as deleted',
                                type: 'success',
                            };
                            eventBus.$emit('show-msg', msg);
                        })
                    break;
                case true:
                    if (confirm('email will be deleted permanently')) {
                        emailService.remove(emailId).then((emails) => {
                            this.emails = this.sortEmails(emails);
                            this.showEmail(nextEmailId)
                            const msg = {
                                txt: 'Email has been deleted successfully',
                                type: 'success',
                            };
                            eventBus.$emit('show-msg', msg);
                        });
                    }
                    break;
            }

        },
        restoreEmail(emailId) {
            const idx = this.emailsToShow.findIndex(email => email.id === emailId)
            const nextEmailId = idx === 0 && this.emailsToShow[idx + 1] ? this.emailsToShow[1].id :
                idx === 0 && !this.emailsToShow[idx + 1] ? null : this.emailsToShow[idx - 1].id;
            const email = this.emailsToShow[idx];
            email.isDeleted = false;
            emailService.save(email)
                .then(email => {
                    this.showEmail(nextEmailId)
                    const msg = {
                        txt: 'Email has been restored successfully',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                })
        },
        markRead(email) {
            email.isRead = true;
            emailService.save(email).then(() => this.loadEmails());
        },
        toggleRead(email) {
            email.isRead = !email.isRead;
            emailService.save(email).then(() => this.loadEmails());
        },
        toggleStarred(email) {
            email.isStarred = !email.isStarred;
            emailService.save(email);
        },
        setSearch(searchBy) {
            const searchObj = {...searchBy }
            if (!searchObj.route) {
                searchObj.route = this.searchBy.route;
                this.searchBy = searchObj;
            }
            this.searchBy.route = searchObj.route
        },
        setSort(sortBy) {
            console.log('fdfd')
            this.sortBy = sortBy;
            this.loadEmails();
        },
    },
    computed: {
        emailsToShow() {
            if (this.searchBy.route === 'inbox') {
                if ((!this.searchBy.txt && ((!this.searchBy.isRead && !this.searchBy.isUnread) ||
                        (this.searchBy.isRead && this.searchBy.isUnread))))
                    return this.emails.filter((email) => {
                        return !email.isDeleted && email.to === 'omribaram@gmail.com';
                    });

                if (this.searchBy.txt) {
                    const searchStr = this.searchBy.txt.toLowerCase();
                    return this.emails.filter((email) => {
                        if (
                            email.subject.toLowerCase().includes(searchStr) ||
                            email.body.toLowerCase().includes(searchStr)
                        ) {
                            if (this.searchBy.isRead) {
                                return email.isRead && email.to === 'omribaram@gmail.com';
                            } else if (this.searchBy.isUnread) {
                                return !email.isRead && email.to === 'omribaram@gmail.com';
                            } else {
                                return email && email.to === 'omribaram@gmail.com';
                            }
                        }
                    });
                } else if (this.searchBy.isRead) {
                    return this.emails.filter((email) => {
                        return email.isRead && email.to === 'omribaram@gmail.com';
                    });
                } else {
                    return this.emails.filter((email) => {
                        return !email.isRead && email.to === 'omribaram@gmail.com';
                    });
                }
            } else switch (this.searchBy.route) {
                case 'starred':
                    return this.emails.filter(email => {
                        return this.searchBy.isRead && !this.searchBy.isUnread ? email.isStarred && email.isRead :
                            this.searchBy.isUnread && !this.searchBy.isRead ? email.isStarred && !email.isRead :
                            email.isStarred;
                    });
                case 'sent':
                    return this.emails.filter(email => {
                        return this.searchBy.isRead && !this.searchBy.isUnread ? email.isSent && email.isRead || email.replies && email.isRead :
                            this.searchBy.isUnread && !this.searchBy.isRead ? email.isSent && !email.isRead || email.replies && !email.isRead :
                            email.isSent || email.replies
                    });
                case 'deleted':
                    return this.emails.filter(email => {
                        return this.searchBy.isRead && !this.searchBy.isUnread ? email.isDeleted && email.isRead :
                            this.searchBy.isUnread && !this.searchBy.isRead ? email.isDeleted && !email.isRead :
                            email.isDeleted;
                    });
            }
        },
    },
    components: {
        emailNav,
        emailSearch,
        emailList,
        emailDetails,
        emailCompose,
    },
    watch: {
        'this.$route.params.note': {
            immediate: true,
            handler() {
                if (!this.$route.params.note) return
                const { note } = this.$route.params;
                const email = {};
                switch (note.type) {
                    case 'noteImg':
                        email.image = note.info.url;
                        email.body = `Image received from Ms. Keep!`;
                        break;
                    case 'noteTxt':
                        email.body = note.info.txt;
                        break;
                    case 'noteVideo':
                        email.video = note.info.url;
                        email.body = `Video received from Ms. Keep!`;
                        break;
                    case 'noteTodos':
                        email.subject = `Note for myself: ${note.info.label}`;
                        email.todos = note.info.todos;
                        email.body = `Your To-Dos list:`
                        break;
                }
                email.from = 'omribaram@gmail.com';
                email.to = 'omribaram@gmail.com';
                if (!email.subject) email.subject = `Note for myself: ${note.info.title}`;
                email.isRead = false;
                email.isStarred = false;
                email.isSent = true;
                email.isDeleted = false;
                email.sentAt = Date.now();
                this.note = email;
                this.isComposingEmail = true;
            }
        }
    }
}