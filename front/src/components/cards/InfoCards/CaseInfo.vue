<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Extra information
    </v-card-title>
    <v-card-text class="text-h6 mb-1 text--primary">
      <v-spacer/>
      Case Name: {{ info.aCase.name ? info.aCase.name : '' }}
      <p>Address:
        {{ info.aCase.address ? info.aCase.address.city : '' }}
        {{ info.aCase.address ? info.aCase.address.street : '' }}
        {{ info.aCase.address ? info.aCase.address.house : '' }}
      </p>
      <v-spacer/>
      Client Info:
      <v-spacer/>
      <p>
        Name: {{ info.aCase.client.human.name ? info.aCase.client.human.name : '' }}
        {{ info.aCase.client.human.surname ? info.aCase.client.human.surname : '' }}
        <v-spacer/>
        Profession: {{ info.aCase.client.human.profession ? info.aCase.client.human.profession : '' }}
        <v-spacer/>
        Cash: {{ info.aCase.client.cash ? info.aCase.client.cash : '' }}
        <v-spacer/>
      </p>
      Start Date: {{ info.aCase.start_date ? info.aCase.start_date : 'no date' }}
      <v-spacer/>
      End Date: {{ info.aCase.end_date ? info.aCase.end_date : 'no date' }}
      <v-spacer/>
      List of performers: {{ info.listOfPerformers.toString() ? info.listOfPerformers.toString() : 'no performers' }}
      <v-spacer/>
      List of evidences: {{ info.listOfEvidences.toString() ? info.listOfEvidences.toString() : 'no evidences' }}
      <v-spacer/>
      List of criminals: {{ info.listOfCriminals.toString() ? info.listOfCriminals.toString() : 'no criminals' }}
      <v-spacer/>
      List of sources: {{ info.listOfSources.toString() ? info.listOfSources.toString() : 'no sources' }}
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