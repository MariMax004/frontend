<template>
  <v-form v-model="valid" lazy-validation ref="form">
  <v-card>
    <v-card-title>
      <span class="text-h5">Performer</span>
    </v-card-title>
    <v-card-text v-if="!blackList.includes(meRole)">
      <v-select
          label="Human"
          :items="humans"
          v-model="selectHuman"
          :rules="clearFieldValid"
      ></v-select>
      <v-select
          label="Address"
          :items="addresses"
          v-model="selectAddress"
          :rules="clearFieldValid"
      ></v-select>
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
  name: "AddPerformer",
  data: () => ({
    humans: [],
    addresses: [],
    selectHuman: '',
    selectAddress: '',
    mainHumans: [],
    mainAddresses: [],
    findIndex: 0,
    errorFlag: false,
    baseUrl: 'http://localhost:10511',
    clearFieldValid: [
      v => !!v || 'Field is required'
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
      if(this.$refs.form.validate()) {
        this.findInMass(this.selectHuman, this.humans)
        let human_id = this.mainHumans[this.findIndex].id
        this.findInMass(this.selectAddress, this.addresses)
        let address_id = this.mainAddresses[this.findIndex].id
        let data = {
          human_id: human_id,
          address_id: address_id
        }
        if (this.flagEdit) {
          axios
              .create({baseURL: this.baseUrl, headers: {
                  'Authorization': 'Bearer '+ VueCookies.get("token")}})
              .put('/performer/' + this.item.id, data)
              .then(resp => {
                console.log(resp.data)
                window.location.reload()
                data = {
                  errorText: '',
                  dialog: false,
                  error: false
                }
                this.$emit('updateParent', {
                  data
                })
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
          axios
              .create({baseURL: this.baseUrl, headers: {
                  'Authorization': 'Bearer '+ VueCookies.get("token")}})
              .post('/performer', data)
              .then(resp => {
                console.log(resp.data)
                window.location.reload()
                data = {
                  errorText: '',
                  dialog: false,
                  error: false
                }
                this.$emit('updateParent', {
                  data
                })
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
    getDataFromHumanList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/human').then(resp => {
        this.mainHumans = resp.data;
        for (let i = 0; i < this.mainHumans.length; i++) {
          this.humans.push(this.mainHumans[i].name + " " + this.mainHumans[i].surname)
        }
      })
    },
    getDataFromAddressList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/address').then(resp => {
        this.mainAddresses = resp.data
        for (let i = 0; i < this.mainAddresses.length; i++) {
          this.addresses.push(this.mainAddresses[i].city + " " + this.mainAddresses[i].street +
              " " + this.mainAddresses[i].house)
        }
      })
    },
    findInMass(findName, mass) {
      for (let i = 0; i < mass.length; i++) {
        if (mass[i] == findName) {
          this.findIndex = i;
          break;
        }
      }
    },
    checkAndFill(item) {
      if (item != null) {
        axios.create({
          baseURL: this.baseUrl, headers: {
            'Authorization': 'Bearer '+ VueCookies.get("token")}
        }).get('/performer/' + item.id).then(resp => {
          this.selectHuman = resp.data.human.name + " " + resp.data.human.surname
          this.selectAddress = resp.data.address.city + " " + resp.data.address.street + " " + resp.data.address.house
        })
      }
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.getDataFromHumanList()
    this.getDataFromAddressList()
    this.checkAndFill(this.item)
  },
}
</script>

<style scoped>

</style>