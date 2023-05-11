<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Extra information
    </v-card-title>
    <v-card-text class="text-h6 mb-1 text--primary">
      Human Info:
      <v-spacer/>
      {{ info.human ? info.human.name : '' }} {{ info.human ? info.human.surname : '' }}
      <v-spacer/>
      Age: {{ info.human ? info.human.age : '' }}
      <v-spacer/>
      Gender: {{ info.human ? info.human.gender : '' }}
      <v-spacer/>
      Profession: {{ info.human ? info.human.profession : '' }}
    </v-card-text>
    <v-card-text class="text-h6 mb-1 text--primary">
      Address Info:
      <v-spacer/>
      City: {{ info.address ? info.address.city : '' }}
      <v-spacer/>
      Street: {{ info.address ? info.address.street : '' }}
      <v-spacer/>
      House: {{ info.address ? info.address.house : '' }}
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