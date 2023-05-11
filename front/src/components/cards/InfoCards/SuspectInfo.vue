<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Extra information
    </v-card-title>
    <v-card-text class="text-h6 mb-1 text--primary">
      Suspect
      <v-spacer/>
      Appearance: {{ info.appearance ? info.appearance : '' }}
      <v-spacer/>
      Name: {{ info.human.name ? info.human.name : '' }} {{ info.human.surname ? info  .human.surname : '' }}
      <v-spacer/>
      Profession: {{ info.human.profession ? info.human.profession : '' }}
      <v-spacer/>
      Criminal: {{ info.criminal.toString() ? info.criminal.toString() : '' }}
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="changeDialog"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "HumanInfo",
  props: {
    info: null
  },
  methods: {
    changeDialog() {
      this.$emit('updateDialog', {
        flag: false
      })
    }
  }
}
</script>

<style scoped>

</style>