<template>
  <div class="login-page">
    <div class="succes-popup hidden">
      <div class="succes-popup-content">
        <p>U bent succesvol geregistreerd!</p>
        <p>U kunt nu inloggen, wij redirecten u nu</p>
      </div>
    </div>
    <div class="form">
      <!-- ==================================================== Registration ==================================================== -->
      <form autocomplete="on" v-if="!logInActive">
        <input
          type="text"
          placeholder="gebruikersnaam"
          v-model="username"
          autocomplete="username"
          :class="{
            error: username.length < 3 && username != '',
          }"
        />
        <input
          type="email"
          placeholder="email"
          v-model="email"
          autocomplete="email"
          :class="{
            error: email != '' && validateEmail(email),
          }"
        />
        <input
          type="password"
          placeholder="wachtwoord"
          v-model="password"
          autocomplete="current-password"
          :class="{
            error: password.length < 4 && password != '',
          }"
        />
        <input
          type="password"
          placeholder="bevestig wachtwoord"
          v-model="conf_password"
          autocomplete="current-password"
          :class="{
            error: validatePasswords(password, conf_password) && conf_password != '',
          }"
        />
        <select name="functie" class="custom-select" v-model="functie">
          <option value="1">Magazijnmedewerker</option>
          <option value="2">Vrijwilliger</option>
        </select>

        <button
          :disabled="
            username.length < 3 ||
            email == '' ||
            password.length < 4 ||
            conf_password == '' ||
            validateEmail(email) ||
            validatePasswords(password, conf_password)
          "
          @click="
            (e) => {
              e.preventDefault();
              oauth_refresh();
            }
          "
        >
          aanmelden
        </button>
        <p style="color: red" v-if="email_error">Email al in gebruik</p>
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

<script lang="ts">
export default {
  setup() {
    const logInActive = ref(true);
    // login
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const conf_password = ref("");
    const functie = ref(1);

    const email_error = ref(false);

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
          if (username.value.length < 3) return;
          if (password.value.length < 4) return;

          options.method = "PUT";
          options.body = JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            functie: functie.value,
          });
        }
      },
      onResponse({ response, options }) {
        console.log(response.status);
        switch (response.status) {
          case 200:
            const auth = useCookie("Authorization", {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            const auth_key = useCookie("Authorization-key", {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            const auth_role = useCookie("Authorization-role", {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            const auth_name = useCookie("Authorization-name", {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            auth.value = response.headers.get("Authorization");
            auth_key.value = response.headers.get("Authorization-key");
            auth_role.value = response.headers.get("Authorization-role");
            auth_name.value = response.headers.get("Authorization-name");

            navigateTo("/", { replace: true });
            break;
          case 201:
            const popup = document.querySelector(".succes-popup");
            popup?.classList.remove("hidden");
            setTimeout(() => {
              popup?.classList.add("hidden");
              window.location.reload();
            }, 1000);
            
            break;
          case 401:
            break;
          case 409:
            email_error.value = true;
            console.log("email already in use", response.status, email_error.value);
            break;
        }
      },
    });

    return {
      logInActive,
      username,
      email,
      password,
      conf_password,
      functie,
      email_error,
      oauth_status,
      oauth_refresh,
    };
  },
  methods: {
    toggleForm() {
      this.logInActive = !this.logInActive;
    },
    validateEmail(email: string) {
      const re = /\S+@\S+\.\S+/;
      return !re.test(email);
    },
    validatePasswords(password: string, conf_password: string) {
      return password.length < 4 || password != conf_password;
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.succes-popup {
  position: absolute;
  z-index: 100;

  /* center top */
  top: 5%;
  left: 50%;

  /* size */
  width: 300px;
  height: 100px;

  /* style */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  /* animation */
  transition: all 0.3s ease-in-out;

}

.hidden {
  display: none;
  z-index: -100;
}

.error {
  color: red;
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

.form select {
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

.form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: var(--color-button-hover);
}

.form .message {
  margin-top: 15px;
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
