export const i18nService = {
    priceForDisplay,
    dateForDisplay
}

function priceForDisplay({ listPrice }) {
    return listPrice.amount.toLocaleString('en-us', { style: 'currency', currency: listPrice.currencyCode })
}

function dateForDisplay(date) {
    return new Date(date).toLocaleDateString('en-il')
}