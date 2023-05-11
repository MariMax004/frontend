<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">Case</span>
      </v-card-title>
      <v-card-text v-if=" meRole!='ROLE_LESTRADE'">
        <v-row>
          <v-col>
            <v-text-field
                v-model="name"
                label="Case name"
                :rules="clearFieldValid"
                required
            ></v-text-field>
            <v-select
                label="Client"
                :items="clients"
                v-if=" meRole=='ROLE_SHERLOCK'"
                v-model="selectClient"
                :rules="clearFieldValid"
            ></v-select>
            <v-select
                v-model="selectSources"
                :items="sources"
                v-if="!blackList.includes(meRole) || meRole=='ROLE_WATSON'"
                label="Sources"
                multiple
                clearable
            >
              <template v-slot:selection="{ item, index }">

                <span v-if="index === 0">{{ item }}</span>
                <span
                    v-if="index === 1"
                    class="grey--text text-caption"
                >
                  (+{{ selectSources.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-select
                label="Address"
                :items="addresses"
                v-if=" meRole=='ROLE_SHERLOCK'"
                v-model="selectAddress"
                :rules="clearFieldValid"
            ></v-select>
            <v-select
                v-model="selectPerformers"
                :rules="clearFieldValid"
                :items="performers"
                v-if=" meRole=='ROLE_SHERLOCK'"
                label="Performers"
                multiple
                clearable

            ></v-select>
          </v-col>
        </v-row>
        <v-row>
        </v-row>

      </v-card-text>
      <v-card-text v-if="meRole=='ROLE_LESTRADE'">
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
            v-if="meRole=='ROLE_SHERLOCK'"
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
  name: "AddCaseCard",
  data: () => ({
    clients: [],
    addresses: [],
    selectClient: '',
    selectAddress: '',
    name: '',
    findIndex: 0,
    indexes: [],
    mainClients: [],
    mainAddresses: [],
    selectPerformers: [],
    performers: [],
    mainPerformers: [],
    selectSources: [],
    sources: [],
    mainSources: [],
    baseUrl: 'http://localhost:10511',
    clearFieldValid: [
      v => !!v || 'Field is required'
    ],
    valid: true,
    blackList: ["ROLE_SHERLOCK", "ROLE_WATSON", "ROLE_LESTRADE"],
    meRole: ''
  }),
  props: {
    item: null,
    flagEdit: Boolean,
  },
  methods: {

    saveAndClose() {
      if (this.$refs.form.validate()) {
        this.findInMass(this.selectClient, this.clients)
        let client_id = this.mainClients[this.findIndex].id
        this.findInMass(this.selectAddress, this.addresses)
        let address_id = this.mainAddresses[this.findIndex].id
        this.findArray(this.selectPerformers, this.performers)
        let performers = [];
        for (let i = 0; i < this.indexes.length; i++) {
          performers.push(this.mainPerformers[this.indexes[i]].id)
        }
        this.findArray(this.selectSources, this.sources)
        let sources = [];
        for (let i = 0; i < this.indexes.length; i++) {
          sources.push(this.mainSources[this.indexes[i]].id)
        }
        let data = {
          client_id: client_id,
          address_id: address_id,
          name: this.name,
          performers: performers,
          sources: sources
        }
        if (this.flagEdit) {
          data = {
            client_id: client_id,
            address_id: address_id,
            name: this.name,
            performers: performers,
            sources: sources
          }
          axios.create({baseURL: this.baseUrl, headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).put('/case/' + this.item.id, data)
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
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).post('/case', data)
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
      }
    },
    doSomething() {
      let data = {
        errorText:'',
        dialog: false,
        error: false
      }
      this.$emit('updateParent', {
        data
      })
    },
    getDataFromClientList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/client').then(resp => {
        this.mainClients = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.clients.push(resp.data[i].name)
        }
      })
    },
    getDataFromAddressList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/address').then(resp => {
        this.mainAddresses = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.addresses.push(resp.data[i].city + " " + resp.data[i].street + " " + resp.data[i].house)
        }
      })
    },
    getDataFromPerformerList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/performer').then(resp => {
        this.mainPerformers = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.performers.push(resp.data[i].name + " " + resp.data[i].surname)
        }
      })
    },
    getDataFromSourceList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/source').then(resp => {
        this.mainSources = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.sources.push(resp.data[i].name)
        }
      })
    },
    checkAndFill(item) {
      if (item != null) {
        axios.create({
          baseURL: this.baseUrl, headers: {
            'Authorization': 'Bearer '+ VueCookies.get("token")}
        }).get('/case/' + item.id).then(resp => {
          this.name = resp.data.aCase.name
          this.selectClient = resp.data.aCase.client.human.name + " " + resp.data.aCase.client.human.surname
          this.selectAddress = resp.data.aCase.address.city + " " + resp.data.aCase.address.street + " " + resp.data.aCase.address.house
          this.selectPerformers = resp.data.listOfPerformers
          this.selectSources = resp.data.listOfSources
        })
      }
    },
    findInMass(findName, mass) {
      for (let i = 0; i < mass.length; i++) {
        if (mass[i] === findName) {
          this.findIndex = i;
          break;
        }
      }
    },
    findArray(findName, mass) {
      this.indexes = []
      for (let j = 0; j < findName.length; j++) {
        for (let i = 0; i < mass.length; i++) {
          if (mass[i] === findName[j]) {
            this.indexes.push(i)
            break;
          }
        }
      }
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.getDataFromClientList()
    this.getDataFromAddressList()
    this.getDataFromPerformerList()
    this.getDataFromSourceList()
    this.checkAndFill(this.item)
  }
}
</script>

<style scoped>

</style>