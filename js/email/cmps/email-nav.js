import emailStatus from '../cmps/email-status.js';

export default {
    props: ['emails'],
    template: `
    <nav class="email-nav">
        <ul class="email-nav-menu">
            <li>
                <button @click="onComposeEmail" class="btn-email-compose">
                    <img src="img/apps/email/compose.png"/>
                </button>
            </li>
            <li>
                <div class="nav-inbox active" @click="handleClick('inbox')">
                    <img src="img/apps/email/inbox.png"/>
                    Inbox
                    <span class="sort-date" title="Sort by Date" @click="onSetSort('date')"><span>&nbsp;</span></span>
                    <span class="sort-title" title="Sort by Subject" @click="onSetSort('subject')"><span></span></span>
                    <span>{{showUnreadCount('inbox')}}</span>
                </div>  
            </li>
            <li>
                <div class="nav-starred" @click="handleClick('starred',$event)">
                    <img src="img/apps/email/starwhite.png"/>
                    Starred
                    <span>{{showUnreadCount('isStarred')}}</span>
                </div>
            </li>
            <li>
                <div class="nav-sent" @click="handleClick('sent',$event)">
                    <img src="img/apps/email/sent.png"/>
                    Sent
                    <span>{{showUnreadCount('isSent')}}</span>
                </div>
            </li>
            <li>
                <div class="nav-deleted" @click="handleClick('deleted',$event)">
                    <img src="img/apps/email/delete.png"/>
                    Deleted
                    <span>{{showUnreadCount('isDeleted')}}</span>
                </div>
            </li>
            <li>
                <email-status :emails="emails" @unread="updateUnreadCount"/>
            </li>
        </ul>
        <div class="hamburger" @click="onToggleHamMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>
    `,
    components: {
        emailStatus
    },
    data() {
        return {
            unreadCount: null
        }
    },
    methods: {
        updateUnreadCount(unreadCount) {
            this.unreadCount = unreadCount;
        },
        onSelectNav(page) {
            this.$emit('navigate', page);
        },
        onComposeEmail() {
            this.$emit('compose');
            this.onToggleHamMenu()
        },
        onToggleHamMenu() {
            document.querySelector('.hamburger').classList.toggle("active");
            document.querySelector('.email-nav-menu').classList.toggle("active");
        },
        handleClick(route) {
            const searchBy = {
                route
            }
            this.$emit('navigate', searchBy);
            for (const li of this.$el.children[0].children) {
                if (li.children[0].className.includes(route))
                    li.children[0].classList.add('active')
                else li.children[0].classList.remove('active')
            }
            this.onToggleHamMenu()
        },
        onSetSort(value) {
            this.$emit('sorted', value);
        },
        showUnreadCount(route) {
            const unreadCount = this.emails.filter(email => {
                if (route === 'inbox') return !email.isRead && email.to === 'omribaram@gmail.com';
                else if (route === 'isStarred') return email.isStarred && !email.isRead && !email.isDeleted;
                else if (route === 'isSent') return email.isSent && !email.isRead && !email.isDeleted;
                else if (route === 'isDeleted') return email.isDeleted && !email.isRead
            }).length;
            return unreadCount ? unreadCount : ''
        }
    },
    computed: {}
};