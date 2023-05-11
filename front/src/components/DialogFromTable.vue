<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-icon small class="mr-2" v-bind="attrs" v-on="on">
          mdi-pencil
        </v-icon>
    </template>

    <AddHumanCard v-if="this.nav_context === 'main'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddPerformer v-if="this.nav_context === 'performer'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddClientCard v-if="this.nav_context === 'client'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddAddressCard v-if="this.nav_context === 'address'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddCaseCard v-if="this.nav_context === 'case'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddSuspectCard v-if="this.nav_context === 'suspect'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddEvidenceCard v-if="this.nav_context === 'evidence'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddSourceCard v-if="this.nav_context === 'source'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddPunishmentCard v-if="this.nav_context === 'punishment'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddCrimeTypeCard v-if="this.nav_context === 'crimetype'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
    <AddCriminalCard v-if="this.nav_context === 'criminal'" :item="item" :flagEdit="true" @updateParent="updateDialog"/>
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
    item: null,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    updateDialog(data) {
      this.dialog = data.data.dialog
      this.$emit('updateParent', {
        data: data.data
      })
    }
  }
}
</script>

<style scoped>

</style>