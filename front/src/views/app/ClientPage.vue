<template>
  <v-row class="no-gutters">
    <v-col cols="2">
      <NavigationBar/>
    </v-col>
    <v-col cols="max">
      <AppBar :nav_context=this.nav_context :nowStatusButton=this.nowStatusButton @updateParent="statusButton"/>
      <AlertCard :error-text="this.errorText" v-if="error" @updateAlert="closeAlert"></AlertCard>
      <Table  :headersProps="this.headers" :urlProps="this.url" :nav_context=this.nav_context :editFlag="this.addFlag" v-show="headers"
              @updateParent="statusButton"/>
    </v-col>
  </v-row>
</template>
<script>
import NavigationBar from "@/components/NavigationBar";
import AppBar from "@/components/AppBar";
import Table from "@/components/Table";
import AlertCard from "../../components/alerts/AlertCard";

export default {
  name: "ClientPage",
  components: {AlertCard, AppBar, Table, NavigationBar},
  data: () => ({
    url: '/client',
    nav_context: 'client',
    nowStatusButton: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        value: 'id',
      },
      {
        text: 'Is police',
        value: 'police'
      },
      {
        text: 'Money',
        value: 'money'
      },
      {
        text: 'Name',
        value: 'name'
      },
    ],
    addFlag: false,
    error: false,
    errorText: ""
  }),
  methods: {
    statusButton(newState) {
      this.errorText = newState.data.errorText
      this.nowStatusButton = newState.data.statusButton
      this.error = newState.data.error
      if (this.nowStatusButton && !this.addFlag) {
        this.addFlag = true
        this.headers.push({text: 'Actions', value: 'actions', sortable: false})
      }
      if (!this.nowStatusButton && this.addFlag) {
        this.addFlag = false
        this.headers.pop()
      }
    },
    closeAlert(flag) {
      this.error = flag.flag
    },
  }
}
</script>

<style scoped>

</style>