<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green" outlined  style="margin-right: 20px" v-bind="attrs" v-on="on">
        <v-icon dark style="margin-right: 5px">
          mdi-database-plus-outline
        </v-icon>
        Add new
      </v-btn>
    </template>

    <AddHumanCard v-if="this.nav_context === 'main'" @updateParent="updateDialog"/>
    <AddPerformer v-if="this.nav_context === 'performer'" @updateParent="updateDialog"/>
    <AddClientCard v-if="this.nav_context === 'client'" @updateParent="updateDialog"/>
    <AddAddressCard v-if="this.nav_context === 'address'" @updateParent="updateDialog"/>
    <AddCaseCard v-if="this.nav_context === 'case'" @updateParent="updateDialog"/>
    <AddSuspectCard v-if="this.nav_context === 'suspect'" @updateParent="updateDialog"/>
    <AddEvidenceCard v-if="this.nav_context === 'evidence'" @updateParent="updateDialog"/>
    <AddSourceCard v-if="this.nav_context === 'source'" @updateParent="updateDialog"/>
    <AddPunishmentCard v-if="this.nav_context === 'punishment'" @updateParent="updateDialog"/>
    <AddCrimeTypeCard v-if="this.nav_context === 'crimetype'" @updateParent="updateDialog"/>
    <AddCriminalCard v-if="this.nav_context === 'criminal'" @updateParent="updateDialog"/>
  </v-dialog>
</template>

<script>
import AddHumanCard from "@/components/cards/AddHumanCard";
import AddPerformer from "@/components/cards/AddPerformer";
import AddClientCard from "@/components/cards/AddClientCard";
import AddAddressCard from "@/components/cards/AddAddressCard";
import AddCaseCard from "@/components/cards/AddCaseCard";
import AddSuspectCard from "@/components/cards/AddSuspectCard";
import AddEvidenceCard from "@/components/cards/AddEvidenceCard";
import AddSourceCard from "@/components/cards/AddSourceCard";
import AddPunishmentCard from "@/components/cards/AddPunishmentCard";
import AddCrimeTypeCard from "@/components/cards/AddCrimeTypeCard";
import AddCriminalCard from "@/components/cards/AddCriminalCard";

export default {
  name: "Dialog",
  components: {
    AddEvidenceCard,
    AddPerformer,
    AddHumanCard,
    AddClientCard,
    AddAddressCard,
    AddCaseCard,
    AddSuspectCard,
    AddSourceCard,
    AddPunishmentCard,
    AddCrimeTypeCard,
    AddCriminalCard
  },
  props: {
    nav_context: String,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    updateDialog(data) {
      this.dialog = data.data.dialog
      console.log("error state 2: " + data.data.error)
      console.log("error state 2 message: " + data.data.errorText)
      this.$emit('updateParent', {
        error: data.data.error,
        errorText: data.data.errorText
      })
    }
  }
}
</script>

<style scoped>

</style>