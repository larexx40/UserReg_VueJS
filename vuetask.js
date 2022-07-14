
let app = Vue.createApp({

})

app.component("login", {
    template: `
    <div>
        <h1>{{title}}</h1>
        <form @submit.prevent="handleSubmit">
            <label>Email:</label>
            <input type="text" v-model="email" required>

            <label>Password:</label>
            <input type="password" v-model="password" required>

            <div class="submit">
            <button>Login</button>
            </div>
            <p>Email: {{email}}</p>
            <p>password: {{password}}</p>
        </form>
    </div>
    `,
    data() {
        return {
            title: 'LoginForm',
            email: '',
            password: ''
        }
    },
    methods: {
        async handleSubmit(){
            const input = {
                email: this.email,
                password: this.password
            }
            let response = await axios.post('http://localhost:9000/user/login', input)
            if (response) {
                swal("Login Successful")
                console.log(response.data);
            }
        }
    },
});

app.component("register", {
    template: `
        <form @submit.prevent="handleSubmit">
            <h1>{{title}}</h1>

            <label>Username:</label>
            <input type="text" v-model="username" required>

            <label>Email:</label>
            <input type="email" v-model="email" required>

            <label>Phone no:</label>
            <input type="number" v-model="phoneno" required>

            <label>Password:</label>
            <input type="password" v-model="password" required>

            <div class="submit">
            <button>Create an Account</button>
            </div>
        </form>
    `,
    data() {
        return {
            title: 'Registration Form',
            username: '',
            email: '',
            password: '',
            phoneno: '',
        }
    },
    methods: {
        async handleSubmit () {
            const input ={
                email: this.email,
                password: this.password,
                phoneno:  this.phoneno,
                username:  this.username
            }
            const response = await axios.post('http://localhost:9000/user/register', input)
            console.log(response.data);
            swal('Registration',response.data,"success")
        }
    }
});

app.component("hackernews", {
    template: `
        <h2>{{title}}</h2>
        <p>{{postsId}}</p> 
        <div v-for="post of postsId">
            <p>{{post}}</p>
        </div>  
    `,
    data() {
        return {
            title: 'Hacker News',
            email: '',
            password: '',
            postinfo: [],
            postsId: []
        }
    },
    mounted () {
        axios
        .get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy="$priority"&limitToFirst=7')
        .then(response => {
            this.postsId = response.data
            console.log(response.data);
        }).catch((err) => {
            console.log(err)
        });
    },
    methods: {
        
    },
});

app.mount("#app")