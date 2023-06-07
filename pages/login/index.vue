<template>
    <div class="login-page">
  <div class="form">
    <form class="display-none" ref="register">
      <input type="text" placeholder="gebruikersnaam" v-model="username"/>
      <input type="email" placeholder="email" v-model="regemail"/>
      <input type="password" placeholder="wachtwoord" v-model="pass"/>
      <input type="password" placeholder="bevestig wachtwoord" v-model="confpass"/>
      <button @click="register">aanmelden</button>
      <p class="message">Al geregistreerd? <a href="#" @click="toggleLogin">Login</a></p>
    </form>
    <form class="display-block" ref="login">
      <input type="email" placeholder="email" v-model="email" />
      <input type="password" placeholder="wachtwoord" v-model="password" />
      <button @click="login">login</button>
      <p class="message">Niet geregistreerd? <a href="#" @click="toggleRegister">Meld aan</a></p>
    </form>
  </div>
</div>

</template>



<script>
export default {
  data() {
    return {
      isActive: true,
      name: '',
      email: '',
      password: '',
      username: '',
      regemail: '',
      pass: '',
      confpass: '',
    }
  },
  mounted() {
    //import the cookies set in login.ts file
    // const cookies = this.$cookies.get('loggedIn')
    // console.log(cookies)
  },
    methods: {
    toggleRegister() {
        if(this.isActive) {
            this.$refs.register.classList.remove('display-none')
            this.$refs.register.classList.toggle('display-block')
            this.$refs.login.classList.remove('display-block')
            this.$refs.login.classList.toggle('display-none')
        }
        this.isActive = !this.isActive
    },
    toggleLogin() {
        if(!this.isActive) {
            this.$refs.login.classList.remove('display-none')
            this.$refs.login.classList.toggle('display-block')
            this.$refs.register.classList.remove('display-block')
            this.$refs.register.classList.toggle('display-none')
        }
        this.isActive = !this.isActive
    },
    login(e) {
        e.preventDefault()
        const { data, pending, error, refresh } = useFetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.email,
                password: this.password
            })
        })
        const cookieStatus = document.cookie.includes('user_id');
        if (cookieStatus) {
          this.$router.push('/')
        }
    },
    register(e) {
      e.preventDefault()
        const { data, pending, error, refresh } = useFetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                email: this.regemail,
                password: this.pass,
                confirmpassword: this.confpass
            })
        })
        console.log(data, pending, error)
    }
}
}
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);


.display-none {
    display: none;
}
.display-block {
    display: block;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: var(--color-primary);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: 0.3s ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: var(--color-button-hover);
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: var(--color-primary);
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.main:after {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.main:after:before, .main:after:after {
  content: "";
  display: block;
  clear: both;
}
.main:after .info {
  margin: 50px auto;
  text-align: center;
}
.main:after .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.main:after .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.main:after .info span a {
  color: #000000;
  text-decoration: none;
}
.main:after .info span .fa {
  color: #EF3B3A;
}
</style>