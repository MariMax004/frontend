<template>
  <div>
    <DialogInfoTable v-if="dialog" :item="this.item" :urlProps="this.urlProps" :nav_context="nav_context"
                     @changeFlag="swithFlag"/>
    <v-data-table
        @click:row="swithFlag"
        :headers="this.headers"
        :items="desserts"
        :items-per-page="5"
        item-key="name"
        :sort-by="this.headers[0].value"
        :sort-desc="false"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, -1]
      }"
    >
      <template v-slot:item.actions="{ item }">
        <DialogFromTable :nav_context="nav_context" :item="item" @updateParent="update"/>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon v-if="$route.path === '/case' && !blackList.includes(meRole) "
                small
                @click="endCase(item)"
        >
          mdi-close-thick
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import DialogFromTable from "@/components/DialogFromTable";
import DialogInfoTable from "./DialogInfoTable";
import VueCookies from 'vue-cookies';

export default {
  name: "Table",
  components: {DialogInfoTable, DialogFromTable},
  props: {
    headersProps: [],
    urlProps: String,
    nav_context: String,
    editFlag: Boolean
  },
  data: () => ({
    item: null,
    dialog: false,
    headers: [],
    desserts: [],
    renderComponent: true,
    baseUrl: 'http://localhost:10511',
    blackList: ["ROLE_SHERLOCK", "ROLE_WATSON"],
    meRole: ''
  }),
  methods: {
    getTableInfo: function () {
      axios.create({
        baseURL: this.baseUrl,
        timeout: 5000,
        headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get(this.urlProps)
          .then(resp => {
            this.headers = this.headersProps
            this.desserts = resp.data
          })
    },

    deleteItem: function (item) {
      axios.create({
        baseURL: this.baseUrl
      }).delete(this.urlProps + "/" + item.id)
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
    },
    swithFlag: function (row) {
      if (!this.editFlag) {
        this.item = row
        this.dialog = !this.dialog
      }
    },
    endCase: function (item) {
      axios.create({
        baseURL: this.baseUrl, headers: {
          'Authorization': 'Bearer '+ VueCookies.get("token")}
      }).get(this.urlProps + "/end/" + item.id)
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
    },
    update(data) {
      console.log("Data table")
      console.log(data.data)
      this.$emit('updateParent', {
        data: data.data
      })
    },
  },


  beforeMount() {
    this.meRole = VueCookies.get("role")
    this.getTableInfo()
  },
}
</script>

<style scoped>

</style>