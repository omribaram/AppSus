import { i18nService } from "../../services/i18n-service.js";

export default {
    props: ['book'],
    template: `
        <section class="add-book-preview">
            <span class="tooltip">
                <p>{{book.title}}</p>
                <span class="title-tip">{{book.title}}</span>
            </span>
            <div class="book-preview frame">                
                    <img :src="book.imageLinks.thumbnail"/>
            </div>
        </section>
    `,
    computed: {
        showPrice() {
            return i18nService.priceForDisplay(this.book)
        },
    }
};