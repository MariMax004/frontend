<template>
  <v-app-bar color="indigo darken-4" dark height="67px">
    <Dialog :nav_context=this.nav_context @updateParent="errorUpdate"></Dialog>
    <v-btn color="white" outlined style="margin-right: 20px" @click="doSomething">
      <v-icon dark style="margin-right: 5px">
        mdi-database-edit-outline
      </v-icon>
      Edit
    </v-btn>
    <v-spacer/>
    <v-card-title>
      <span class="text-h6">
    {{this.meRole}}</span>
    </v-card-title>
    <v-btn color="red" outlined style="margin-right: 20px" @click="exit()">
      <v-icon dark style="margin-right: 5px">
        mdi-logout
      </v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import Dialog from "@/components/Dialog";
import VueCookies from "vue-cookies";
export default {
  name: "AppBar",
  components: {Dialog},
  data: () => ({
    meRole: '',
  }),
  props: {
    nav_context: String,
    nowStatusButton:Boolean,
  },
  methods: {
    doSomething() {
      let data = {
        statusButton: !this.nowStatusButton,
        error: false
      }
      this.goEmit(data)
    },
    errorUpdate(error){
      console.log("error to main: " + error.error)
      console.log("error to main message: " + error.error)
      let data = {
        statusButton: false,
        error: error.error,
        errorText: error.errorText
      }
      this.goEmit(data)
    },
    goEmit(data){
      this.$emit('updateParent', {
        data
      })
    },
    exit() {
      VueCookies.remove('token')
      VueCookies.remove('role')
      this.$router.push('/')
    }
  },
  beforeMount() {
    this.meRole = VueCookies.get("role")
  }
}
</script>

<style scoped>

</style>