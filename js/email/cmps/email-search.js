export default {
    template: `
        <form @submit.prevent="onSearch" class="form-email-search">
            <img src="img/apps/email/search.svg">
            <input v-model="searchBy.txt" @search="onSearch" type="search" @input="onSearch" placeholder="Search..." class="input-email-search">
            <span class="tooltip">
                <input v-model="searchBy.isRead" type="checkbox" id="email-read-state" @change="onSearch" class="input-email-search">
                <label class="email-read-state" for="email-read-state"></label>
                <span class="email-read-state-tip">
                    Read Emails
                </span>
            </span>
            <span class="tooltip">
                <input v-model="searchBy.isUnread" type="checkbox" id="email-unread-state" @change="onSearch" class="input-email-search">
                <label class="email-unread-state" for="email-unread-state"></label>
                <span class="email-read-state-tip">
                    Unread Emails
                </span>
            </span>
            <button class="btn-email-search">Search</button>
        </form>
    `,
    data() {
        return {
            searchBy: {
                txt: null,
                isRead: false,
                isUnread: false,
            }
        };
    },
    methods: {
        onSearch() {
            this.$emit('searched', this.searchBy);
        }
    }
};