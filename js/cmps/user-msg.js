import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <span @click="closeMsg">x</span>
            <p>
                <span v-if="msg.type==='success'">✔️</span>
                <span v-else>❌</span>
                {{msg.txt}}
                <router-link v-if="msg.id" :to="msg.route + msg.id" @click="closeMsg">Click here to check it out!</></router-link>
            </p>
        </div>
    `,
    data() {
        return {
            msg: null,
            timeout: null,
            id: null,
            route: null
        };
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.msg = null;
            }, 5000);
        },
        closeMsg() {
            this.msg = null;
            clearTimeout(this.timeout);
        }
    }
};