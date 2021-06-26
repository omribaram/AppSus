import { i18nService } from "../../services/i18n-service.js";

export default {
    props: ['book'],
    template: `
        <div class="book-preview frame">
            <p>{{book.title}}</p>
            <div class="sale">
                <img :src="book.thumbnail"/>
                <div v-if="isOnSale" class="ribbon ribbon-top-right"><span>sale</span></div>
            </div>
            <p>{{showPrice}}</p>
        </div>
    `,
    computed: {
        showPrice() {
            return i18nService.priceForDisplay(this.book)
        },
        isOnSale() {
            return this.book.listPrice.isOnSale
        },
    }
};