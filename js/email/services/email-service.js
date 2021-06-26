import { storageService } from '../../services/async-storage-service.js';
import { utilService } from '../../services/util-service.js'

const EMAILS_KEY = 'emailsDB';

export const emailService = {
    query,
    getById,
    getAdjcntEmails,
    remove,
    save
}

function query() {
    if (localStorage.getItem(EMAILS_KEY) && JSON.parse(localStorage.getItem(EMAILS_KEY)).length > 0) {
        return Promise.resolve(JSON.parse(localStorage.getItem(EMAILS_KEY)))
    } else {
        const emails = [{
                id: utilService.makeId(),
                from: 'vue@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'Error',
                body: 'Hey! I was asked by users to be more clear about my error messages (go figure!), so I am approaching you personally let you know that you have encountared the following error: Error: vue.js:634 [Vue warn]: Property or method “item” is not defined on the instance but referenced during render!',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'omribaram@gmail.com',
                to: 'students@coding academy',
                subject: 'Who needs sleep anyway?',
                body: 'Did you see the latest studies which prove that coding is better for your health? I am never going to sleep again!',
                isRead: false,
                isStarred: true,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'not_nigerian_prince@hotmail.com',
                to: 'omribaram@gmail.com',
                subject: 'Dear Friend',
                body: 'Dear friend, my name is John Kelly. I am 59 years old man. I am in hospital in Dubai. Recently, my doctor told me that I would not last for the next six months due to my cancer problem (cancer of the lever). I am giving my money away because of my health condition and the fact that my second wife is a terrifying woman to deal with, marrying her was the only mistake I made in my life. She\'s currently managing my company here, but, I knwo what she is capable of, she has sold her soul to the devil and I do not want her to come near my money. Regards, John Kelly',
                isRead: false,
                isStarred: true,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'omribaram@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'You won $1,000,000 dollars!!! Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
                body: 'OMG can you believe it??? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magnam beatae dolor voluptate ex voluptates ea illo. Eveniet, aspernatur assumenda?',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'vue@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'Error',
                body: 'Hey! I was asked by users to be more clear about my error messages (go figure!), so I am approaching you personally let you know that you have encountared the following error: Error: vue.js:634 [Vue warn]: Property or method “item” is not defined on the instance but referenced during render!',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: '2020@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'I\'m Baccccccccccccccccccccck!',
                body: 'Good luck with COVID again!',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'rachelivardi@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'Any way you can help me spot where is the typo???',
                body: '',
                isRead: false,
                isStarred: true,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'omribaram@gmail.com',
                to: 'students@coding academy',
                subject: 'Who needs sleep anyway?',
                body: 'Did you see the latest studies which prove that coding is better for your health? I am never going to sleep again!',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }, {
                id: utilService.makeId(),
                from: 'omribaram@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'We\'re glad to inform you!!!',
                body: 'You have been accepeted! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sit exercitationem, eaque quos eos quis! Eum repellendus veritatis enim iste sequi voluptatibus, ut earum nemo assumenda nostrum quasi, quisquam voluptate ipsam id debitis odit maxime necessitatibus est, eveniet dolorem ipsum hic placeat sit? Facere similique, nesciunt esse culpa repellat distinctio, ab doloribus perspiciatis sequi rem et commodi aut! Adipisci cupiditate eius quaerat cumque? Repellat officia, beatae natus, consectetur deleniti quod maiores consequuntur vitae soluta unde autem iure facilis fugit ad molestiae eligendi? Hic aliquid perspiciatis labore iusto blanditiis animi cum, quas adipisci, quo fuga maiores earum aspernatur, ab officia est.',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            },
            {
                id: utilService.makeId(),
                from: 'omribaram@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'We\'re glad to inform you!!!',
                body: 'You have been accepeted! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sit exercitationem, eaque quos eos quis! Eum repellendus veritatis enim iste sequi voluptatibus, ut earum nemo assumenda nostrum quasi, quisquam voluptate ipsam id debitis odit maxime necessitatibus est, eveniet dolorem ipsum hic placeat sit? Facere similique, nesciunt esse culpa repellat distinctio, ab doloribus perspiciatis sequi rem et commodi aut! Adipisci cupiditate eius quaerat cumque? Repellat officia, beatae natus, consectetur deleniti quod maiores consequuntur vitae soluta unde autem iure facilis fugit ad molestiae eligendi? Hic aliquid perspiciatis labore iusto blanditiis animi cum, quas adipisci, quo fuga maiores earum aspernatur, ab officia est.',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            },
            {
                id: utilService.makeId(),
                from: '2020@gmail.com',
                to: 'omribaram@gmail.com',
                subject: 'I\'m Baccccccccccccccccccccck!',
                body: 'Good luck with COVID again!',
                isRead: false,
                isStarred: false,
                isSent: false,
                isDeleted: false,
                sentAt: +(Date.now() + (Math.random() * 1000)).toFixed(0)
            }
        ];
        localStorage.setItem(EMAILS_KEY, JSON.stringify(emails))
        return Promise.resolve(JSON.parse(localStorage.getItem(EMAILS_KEY)))
    }
}

function getById(emailID) {
    return storageService.get(EMAILS_KEY, emailID);
}

function getAdjcntEmails(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId)
            return {
                prevEmail: (idx === 0) ? emails[1] : emails[idx - 1],
                nextEmail: (idx + 1 > emails.length - 1) ? emails[0] : emails[idx + 1],
            }
        })
}

function remove(emailID) {
    return storageService.remove(EMAILS_KEY, emailID);
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAILS_KEY, email);
    } else {
        return storageService.post(EMAILS_KEY, email);
    }
}