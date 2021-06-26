export default {
    template: `
    <nav class="top-navs">
        <ul class="app-nav">
            <li>
            <router-link to="/"  active-class="active-link">
                <span>🏠</span>
                <span>Home</span>
            </router-link>
            </li>
            <li>
                <router-link to="/book"  active-class="active-link">
                <span>📚</span>
                <span>Ms. Book</span>                    
                </router-link>
            </li>
            <li>
                <router-link to="/email"  active-class="active-link">
                <span>📧</span>
                <span>Mr. Email</span>
                </router-link>  
            </li>
            <li>
                <router-link to="/keep"  active-class="active-link" >
                <span>📓</span>
                <span>Ms. Keep</span>
                </router-link>
            </li>
        </ul>
        <div class="top-nav-button" @click="onToggleAppNav">
            <img src="img/apps/email/arrow.png"/>
        </div>
    </nav>
    `,
    methods: {
        onToggleAppNav() {
            document.querySelector('.top-navs').classList.toggle("active");
        },
    }
};