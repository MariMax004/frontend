<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Extra information
    </v-card-title>
    <v-card-text class="text-h6 mb-1 text--primary">
      Address Info:
      <v-spacer/>
      City: {{ info.city ? info.city : '' }}
      <v-spacer/>
      Street: {{ info.street ? info.street : '' }}
      <v-spacer/>
      House: {{ info.house ? info.house : '' }}
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