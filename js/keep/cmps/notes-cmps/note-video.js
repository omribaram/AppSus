export default {
	props: ['note'],
	template: `
    <section class="note note-video">
		<p class="boldTxt"> {{note.info.title}} </p>
		<video v-if="!isYT" class="keep-video" controls>
			<source :src="note.info.url" type="video/mp4">
			<source :src="note.info.url" type="video/webm">
			<source :src="note.info.url" >
		
			<p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
		</video>	
		<iframe v-if="isYT" id="ytplayer" type="text/html" class="keep-video"
  :src="editYT()"
  frameborder="0"></iframe>

	</section>
        
    `,
	methods: {
		editYT() {
			const ytLink = this.note.info.url.split('=');
			const idYT = ytLink[1];
			return 'https://www.youtube.com/embed/' + idYT;
		},
	},
	computed: {
		isYT() {
			if (
				this.note.info.url.includes('youtube') ||
				this.note.info.url.includes('youtu.be')
			)
				return true;
		},
	},
	created() {
		// this.note.style.textAlign = 'center';
		// this.note.style.justifyContent = 'space-around';
	},
};
