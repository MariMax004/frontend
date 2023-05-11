<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">Source</span>
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
                v-model="rating"
                label="Rating"
                :rules="clearFieldValid"
                required
            ></v-text-field>
          </v-col>
        </v-row>
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
  name: "AddSourceCard",
  data: () => ({
    name: '',
    rating: '',
    baseUrl: 'http://localhost:10511',
    clearFieldValid: [
      v => !!v || 'Field is required'
    ],
    valid: true,
    blackList: ["ROLE_SHERLOCK", "ROLE_LESTRADE"],
    meRole:''
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
          rating: this.rating
        }
        if (this.flagEdit) {
          data = {
            id: this.item.id,
            name: this.name,
            rating: this.rating
          }
          axios.create({baseURL: this.baseUrl, headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).put('/source/' + this.item.id, data)
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
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).post('/source', data)
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
          dialog: false
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
    checkAndFill(item) {
      if (item != null) {
        axios.create({
          baseURL: this.baseUrl, headers: {
            'Authorization': 'Bearer '+ VueCookies.get("token")}
        }).get('/source/' + item.id).then(resp => {
          this.name = resp.data.name
          this.rating = resp.data.rating
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