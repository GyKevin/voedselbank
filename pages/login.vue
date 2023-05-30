<template>
    <div class="login-page">
  <div class="form">
    <form class="register-form" ref="form">
      <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form class="login-form">
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>login</button>
      <p class="message">Not registered? <a href="#" @click="toggleRegister">Create an account</a></p>
    </form>
  </div>
</div>

</template>

<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);

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
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
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

<script>
export default {
    methods: {
    // toggleForm() {
    //   this.$refs.form.classList.toggle('message a');
    // },
    // showForm() {
    //   this.$refs.form.classList.add('form');
    // }
    toggleRegister() {
        this.$refs.form.classList.toggle('message a')
    }
}
}
</script>