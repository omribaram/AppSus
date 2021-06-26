import keepApp from './keep/pages/keep-app.js';
import emailApp from './email/pages/email-app.js';
import bookApp from './book/pages/book-app.js';
import userMsg from './cmps/user-msg.js';
import appNav from './cmps/app-nav.js';
import appFooter from './cmps/app-footer.js'
import { router } from './router.js';

const options = {
    el: '#apps',
    router,
    template: `
    <section>
        <user-msg />
        <app-nav />
        <router-view />
        <app-footer/>
    </section>`,

    components: {
        emailApp,
        keepApp,
        bookApp,
        userMsg,
        appNav,
        appFooter
    },
};

const app = new Vue(options);