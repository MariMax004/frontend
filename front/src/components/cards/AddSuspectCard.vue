<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h5">Suspect</span>
      </v-card-title>
      <v-card-text v-if="!blackList.includes(meRole)">
        <v-row>
          <v-col>
            <v-select
                label="Human"
                :items="humans"
                :rules="clearFieldValid"
                v-model = "selectHuman"
            ></v-select>
            <v-text-field
                v-model="appearance"
                label="Appearance"
                :rules="clearFieldValid"
                required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-container
                class="px-0"
                fluid
            >
              <v-checkbox
                  v-model="checkbox"
                  :label="`Is criminal: ${checkbox.toString()}`"
              ></v-checkbox>
            </v-container>
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
  name: "AddSuspectCard",
  data: () => ({
    humans:[],
    selectHuman:'',
    mainHumans:[],
    appearance: '',
    checkbox: false,
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
        this.findInMass(this.selectHuman, this.humans)
        let human_id = this.mainHumans[this.findIndex].id
        let data = {
          human_id: human_id,
          appearance: this.appearance,
          criminal: this.checkbox
        }
        if (this.flagEdit) {
          data = {
            human_id: human_id,
            appearance: this.appearance,
            criminal: this.checkbox
          }
          axios.create({baseURL: this.baseUrl, headers: {
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).put('/suspect/' + this.item.id, data)
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
              'Authorization': 'Bearer '+ VueCookies.get("token")}}).post('/suspect', data)
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
          data: data,
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
    getDataFromHumanList() {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get('/human').then(resp => {
        this.mainHumans = resp.data;
        for (let i = 0; i < resp.data.length; i++) {
          this.humans.push(resp.data[i].name + " " + resp.data[i].surname)
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
        }).get('/suspect/' + item.id).then(resp => {
          this.appearance = resp.data.appearance
          this.checkbox = resp.data.criminal
          this.selectHuman = resp.data.human.name + " " + resp.data.human.surname
        })
      }
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.getDataFromHumanList()
    this.checkAndFill(this.item)
  }
}
</script>

<style scoped>

</style>