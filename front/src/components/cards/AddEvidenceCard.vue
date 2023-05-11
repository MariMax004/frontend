<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">Evidence</span>
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
            <v-select
                label="Suspect"
                :items="suspects"
                :rules="clearFieldValid"
                v-model = "selectSuspect"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
                label="Case"
                :items="cases"
                :rules="clearFieldValid"
                v-model = "selectCase"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>


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
  name: "AddEvidenceCard",
  data: () => ({
    name: '',
    cases:[],
    suspects:[],
    selectCase:'',
    selectSuspect:'',
    mainCases: [],
    mainSuspect: [],
    baseUrl:'http://localhost:10511',
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
        this.findInMass(this.selectSuspect, this.suspects)
        let suspect_id = this.mainSuspect[this.findIndex].id
        this.findInMass(this.selectCase, this.cases)
        let case_id = this.mainCase[this.findIndex].id
        let data = {
          suspect_id: suspect_id,
          case_id: case_id,
          evid_name: this.name
        }
        if (this.flagEdit) {
          data = {
            suspect_id: suspect_id,
            case_id: case_id,
            evid_name: this.name
          }
          axios.create({baseURL: this.baseUrl, headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).put('/evidence/' + this.item.id, data)
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
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).post('/evidence', data)
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
        errorText: '',
        dialog: false,
        error: false
      }
      this.$emit('updateParent', {
        data
      })
    },
    getDataFromCaseList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/case').then(resp => {
        this.mainCase = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.cases.push(resp.data[i].caseName)
        }
      })
    },
    getDataFromSuspectList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/suspect').then(resp => {
        this.mainSuspect = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.suspects.push(resp.data[i].name)
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
        }).get('/evidence/' + item.id).then(resp => {
          this.name = resp.data.evid_name
          this.selectCase = resp.data.c.name
          this.selectSuspect = resp.data.suspect.human.name + " " + resp.data.suspect.human.surname
        })
      }
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.getDataFromCaseList()
    this.getDataFromSuspectList()
    this.checkAndFill(this.item)
  }
}
</script>

<style scoped>

</style>