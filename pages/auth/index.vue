<template>
  <div class="login-page">
    <div class="form">
      <!-- ==================================================== Registration ==================================================== -->
      <form autocomplete="on" v-if="!logInActive">
        <input type="text" placeholder="gebruikersnaam" v-model="username" autocomplete="username" />
        <input type="email" placeholder="email" v-model="email" autocomplete="email" />
        <input type="password" placeholder="wachtwoord" v-model="password" autocomplete="current-password" />
        <input type="password" placeholder="bevestig wachtwoord" v-model="conf_password" autocomplete="current-password" />

        <button
          @click="
            (e) => {
              e.preventDefault();
              oauth_refresh();
            }
          "
        >
          aanmelden
        </button>
        <!-- 
        <p class="error_message" v-if="register_email_error === true">invalid email</p>
        <p class="error_message" v-if="register_username_error === true">invalid username</p>
        <p class="error_message" v-if="register_password_error === true">invalid password or passwords don't match</p> -->

        <p class="message">Al geregistreerd? <a href="#" @click="toggleForm">Login</a></p>
      </form>

      <!-- ==================================================== Log in ==================================================== -->
      <form autocomplete="on" v-if="logInActive">
        <input type="email" placeholder="email" v-model="email" autocomplete="email" />
        <input type="password" placeholder="wachtwoord" v-model="password" autocomplete="current-password" />

        <button
          @click="
            (e) => {
              e.preventDefault();
              oauth_refresh();
            }
          "
        >
          login
        </button>

        <p class="error_message" v-if="oauth_status?.status == 401">wachtwoord of email is niet correct.</p>
        <p class="message">Niet geregistreerd? <a href="#" @click="toggleForm">Meld aan</a></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const logInActive = ref(true);

    // login
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const conf_password = ref("");

    const {
      data: oauth_status,
      pending: oauth_pending,
      error: oauth_error,
      refresh: oauth_refresh,
    } = useFetch("/api/auth", {
      immediate: false,
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ request, options }) {
        if (logInActive.value) {
          options.method = "POST";
          options.body = JSON.stringify({
            email: email.value,
            password: password.value,
          });
        } else {
          if (conf_password.value != password.value) return;

          options.method = "PUT";
          options.body = JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
          });
        }
      },
      onResponse({ response, options }) {
        if (response.status == 200) {
          useCookie("Authorization", {
            value: response.headers.get("Authorization"),
            options: {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            },
          });
          useCookie("Authorization-key", {
            value: response.headers.get("Authorization-key"),
            options: {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            },
          });
        }
      },
    });

    return {
      logInActive,
      username,
      email,
      password,
      conf_password,
      oauth_status,
      oauth_refresh,
    };
  },
  methods: {
    toggleForm() {
      this.logInActive = !this.logInActive;
    },
    register(e) {
      e.preventDefault();
      if (!this.validate()) return;

      const { data, pending, error, refresh } = useFetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          email: this.regemail,
          password: this.pass,
          confirmpassword: this.confpass,
        }),
      });
      // console.log(data, pending, error)
    },
    validate() {
      // check for errors
      if (!this.regemail.includes("@", ".")) {
        this.register_email_error = true;
      }
      if (!this.username.includes("")) {
        this.register_username_error = true;
      }
      if (!this.pass.includes("") || this.pass != this.confpass) {
        this.register_password_error = true;
      }
      // if no errors, register
      if (
        this.register_email_error === false &&
        this.register_username_error === false &&
        this.register_password_error === false
      ) {
        return true;
      }
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.error_message {
  color: red;
}

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
  background: #ffffff;
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
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: 0.3s ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
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

.main:after:before,
.main:after:after {
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
  color: #ef3b3a;
}
</style>
