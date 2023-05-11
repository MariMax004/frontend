<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">Human</span>
      </v-card-title>
      <v-card-text v-if="!blackList.includes(meRole)">
        <v-row>
          <v-col>
            <v-text-field
                v-model="name"
                label="Name"
                :rules="clearFieldValid"
                required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                v-model="surname"
                label="Surname"
                :rules="clearFieldValid"
                required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                v-model="age"
                label="Age"
                :rules="numberValid"
                required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-checkbox
                v-model="gender"
                @change="changeGender"
                :label=this.genderName
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-text-field
            v-model="profession"
            :rules="clearFieldValid"
            label="Profession"
            required
        ></v-text-field>
      </v-card-text>
      <v-card-text v-if="blackList.includes(meRole)">
        <span class="text-h5">No access to add</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="doSomething"
        >
          Close
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="saveAndClose"
            v-if="!blackList.includes(meRole)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "AddHumanCard",
  data: () => ({
    name: '',
    surname: '',
    age: '',
    gender: false,
    genderName: 'man',
    profession: '',
    baseUrl: 'http://localhost:10511',
    clearFieldValid: [
      v => !!v || 'Field is required'
    ],
    numberValid: [
      v => !!v || 'Field is required',
      v => !!/^\d*$/.test(v) || 'Is not number',
      v => v < 100 || 'Is over age',
    ],
    valid: true,
    blackList: ["ROLE_WATSON", "ROLE_LESTRADE"],
    meRole: ''
  }),
  props: {
    item: null,
    flagEdit: Boolean,
  },
  methods: {
    saveAndClose() {
      if (this.$refs.form.validate()) {
        let data = {
          name: this.name,
          surname: this.surname,
          age: this.age,
          gender: this.gender,
          profession: this.profession
        }
        if (this.flagEdit) {
          data = {
            id: this.item.id,
            name: this.name,
            surname: this.surname,
            age: this.age,
            gender: this.gender,
            profession: this.profession
          }
          axios.create({baseURL: this.baseUrl,
            headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}
          }).put('/human/' + this.item.id, data)
              .then(resp => {
                console.log(resp.data)
                window.location.reload()
              })
              .catch(err => {
                let data = {
                  errorText: err.response.data.message.toString(),
                  dialog: false,
                  error: true
                }
                this.$emit('updateParent', {
                  data
                })
              })
        } else {

          axios.create({baseURL: this.baseUrl, headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}
          }).post('/human', data)
              .then(resp => {
                console.log(resp.data)
                window.location.reload()
              })
              .catch(err => {
                let data = {
                  errorText: err.response.data.message.toString(),
                  dialog: false,
                  error: true
                }
                this.$emit('updateParent', {
                  data
                })
              })
        }
        data = {
          errorText: '',
          dialog: false,
          error: false
        }
        this.$emit('updateParent', {
          data
        })
      }
    },
    doSomething() {
      let data = {
        errorText: '',
        dialog: false,
        error: false
      }
      this.$emit('updateParent', {
        data
      })
    },
    changeGender() {
      if (this.gender) {
        this.genderName = "woman"
      } else {
        this.genderName = "man"
      }
    },
    checkAndFill(item) {
      if (item != null) {
        axios.create({
          baseURL: this.baseUrl
        }).get('/human/' + item.id).then(resp => {
          this.name = resp.data.name
          this.surname = resp.data.surname
          this.age = resp.data.age
          this.gender = resp.data.gender
          this.changeGender()
          this.profession = resp.data.profession
        })
      }
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.checkAndFill(this.item)
  }
}
</script>

<style scoped>

</style>