import { storageService } from '../../services/async-storage-service.js';

const KEEP_KEY = 'notes';

export const keepService = {
	query,
	addNote,
	getById,
	updateNote,
	removeNote,
};

function query() {
	return storageService.query(KEEP_KEY).then((notes) => {
		if (!notes.length) {
			return storageService.postMany(KEEP_KEY, _createNotes());
		}
		return notes;
	});
}

function addNote(type, info) {
	let newNote = {
		id: null,
		isPinned: false,
		pinSrc: 'img/apps/keep/pin.png',
		type: type,
		isPinned: false,
		info: info,
		style: { backgroundColor: 'lightblue' },
	};
	return storageService.post(KEEP_KEY, newNote);
}

function getById(noteId) {
	return storageService.get(KEEP_KEY, noteId);
}

function updateNote(newNote) {
	return getById(newNote.id).then(() => {
		return storageService.put(KEEP_KEY, newNote);
	});
}

function removeNote(noteId) {
	return storageService.remove(KEEP_KEY, noteId);
}

function _createNotes() {
	var notes = [
		{
			id: storageService.makeId(),
			type: 'noteTxt',
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			info: {
				title: 'The Talking Horse',
				txt: 'A talking horse walks into a bar and approaches the manager. “Excuse me, good sir,” the horse says, “are you hiring?” The manager looks the horse up and down and says, “Sorry, pal. Why don’t you try the circus? The horse nickers. “Why would the circus need a bartender?” ',
			},
			style: { backgroundColor: 'lightblue' },
		},
		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightgreen' },
			type: 'noteImg',
			info: {
				url: 'https://theawesomedaily.com/wp-content/uploads/2017/09/smiling-horse-4-1.jpg',
				title: 'Smile ;)',
			},
		},
		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightcoral' },
			type: 'noteImg',
			info: {
				url: 'https://www.icegif.com/wp-content/uploads/funny.gif',
				title: 'DONT PANIC',
			},
		},
		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightblue' },
			type: 'noteImg',
			info: {
				url: 'https://static.parade.com/wp-content/uploads/2021/04/Horse-Puns-1.jpg',
				title: 'Pony up!',
			},
		},

		{
			id: storageService.makeId(),
			type: 'noteTodos',
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'gray' },
			info: {
				label: 'Things to do today:',
				todos: [
					{
						id: storageService.makeId(),
						txt: 'Learn Vue',
						doneAt: null,
						isMarked: false,
					},
					{
						id: storageService.makeId(),
						txt: 'Learn Yiddish',
						doneAt: null,
						isMarked: false,
					},
					{
						id: storageService.makeId(),
						txt: 'Be Victorious',
						doneAt: null,
						isMarked: false,
					},
				],
			},
		},
		{
			id: storageService.makeId(),
			type: 'noteTxt',
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightblue' },
			isPinned: true,
			info: {
				title: 'Life Lessons',
				txt: 'Q: You’re riding a horse full speed, there’s a giraffe right beside you, and a lion nipping at your heels. What do you do? A: Get off the carousel and sober up. ',
			},
		},
		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightgreen' },
			type: 'noteTxt',
			isPinned: true,
			info: {
				txt: 'A guy is walking through the country when he spots a sign that reads, “Talking Horse for Sale.” Intrigued, he walks up to the stable to check it out. “So what have you done with your life?” he asks the horse. “I’ve led a full life,” the horse answers miraculously. “I was born in The Andes where I herded for an entire village. Years later, I joined the mounted police force in New York and helped keep the city clean. And now, I spend my days giving free rides to underprivileged kids here in the country”. The guy is flabbergasted. He asks the horse’s owner, “Why on earth would you want to get rid of such an incredible animal?" The owner says, “Because he’s a liar! He never did any of that!”',
			},
		},

		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightblue' },
			type: 'noteVideo',
			info: {
				url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
				title: 'I like bunnies too!',
			},
		},
		{
			id: storageService.makeId(),
			isPinned: false,
			pinSrc: 'img/apps/keep/pin.png',
			style: { backgroundColor: 'lightblue' },
			type: 'noteVideo',
			info: {
				url: 'https://www.youtube.com/watch?v=YDj3JHtIviQ',
				title: 'So Sus',
			},
		},
	];
	return notes;
}
//
