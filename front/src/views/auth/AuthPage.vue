<template>
  <v-row class="AuthPage">
    <v-col>
      <v-form v-model="valid" lazy-validation ref="form">
        <v-card max-width="500" max-height="400" class="card" outlined>
          <v-card-title>
            <span>Authorization</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="login"
                label="Login"
                :rules="clearFieldValid"
            ></v-text-field>
            <v-text-field
                :append-icon="eyeFlag ? 'mdi-eye' : 'mdi-eye-off'"
                :type="eyeFlag ? 'text' : 'password'"
                :rules="clearFieldValid"
                label="Password"
                v-model="pass"
                @click:append="eyeFlag = !eyeFlag"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mr-auto ml-auto mb-4" width="200" height="35" @click="auth()">
              Sign in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col>
      <!--      <img src="~@/resource/swp2.jpg" width="100%" style="margin-top: 8%"/>-->
    </v-col>
  </v-row>
</template>

<script>

import axios from "axios";
import VueCookies from 'vue-cookies';

export default {
  name: "AuthPage",
  data: () => ({
    eyeFlag: false,
    login: '',
    pass: '',
    baseUrl: 'http://localhost:10511',
    clearFieldValid: [
      v => !!v || 'Field is required'
    ],
  }),
  methods: {
    auth() {
      if (this.$refs.form.validate()) {
        let data = {
          username: this.login,
          password: this.pass
        }
        axios.create({baseURL: this.baseUrl}).post('/auth', data)
            .then(resp => {
              console.log(resp.data)
              if (resp.status === 200) {
                VueCookies.set('token' , resp.data.token ? resp.data.token.toString() : '', "5h")
                VueCookies.set('role' , resp.data.role ? resp.data.role.toString() : '', "5h")
                this.$router.push('/main')
              }
            })
            .catch(err => {
              console.log(err)
            })
      }
    }
  },
  created() {
    document.querySelector("html").classList.add("AuthPage");
  },
  destroyed() {
    document.querySelector("html").classList.remove("AuthPage");
  }
}
</script>
<style>
.AuthPage {
  background-image:  url('~@/resource/sherlock.jpg');
  background-size: 100%;
}
</style>
<style scoped>
.card {
  margin-right: auto;
  margin-left: auto;
  margin-top: 35%;
}

body {
  position: fixed;
}

::-webkit-scrollbar {
  background: transparent;
}

</style>