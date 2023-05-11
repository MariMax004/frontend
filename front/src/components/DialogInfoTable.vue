<template>
  <v-dialog v-model="dialog" persistent max-width="600px">

    <HumanInfo v-if="nav_context === 'main'" :info="this.data" @updateDialog="changeDialog"/>
    <PerformerInfo v-if="nav_context === 'performer'" :info="this.data" @updateDialog="changeDialog"/>
    <AddressInfo v-if="nav_context === 'address'" :info="this.data" @updateDialog="changeDialog"/>
    <CaseInfo v-if="nav_context === 'case'" :info="this.data" @updateDialog="changeDialog"/>
    <ClientInfo v-if="nav_context === 'client'" :info="this.data" @updateDialog="changeDialog"/>
    <CriminalTypeInfo v-if="nav_context === 'crimetype'" :info="this.data" @updateDialog="changeDialog"/>
    <CriminalInfo v-if="nav_context === 'criminal'" :info="this.data" @updateDialog="changeDialog"/>
    <EvidenceInfo v-if="nav_context === 'evidence'" :info="this.data" @updateDialog="changeDialog"/>
    <PunishmentInfo v-if="nav_context === 'punishment'" :info="this.data" @updateDialog="changeDialog"/>
    <SourceInfo v-if="nav_context === 'source'" :info="this.data" @updateDialog="changeDialog"/>
    <SuspectInfo v-if="nav_context === 'suspect'" :info="this.data" @updateDialog="changeDialog"/>
  </v-dialog>
</template>

<script>
import axios from "axios";
import HumanInfo from "./cards/InfoCards/HumanInfo";
import PerformerInfo from "./cards/InfoCards/PerformerInfo";
import AddressInfo from "./cards/InfoCards/AddressInfo";
import CaseInfo from "./cards/InfoCards/CaseInfo";
import ClientInfo from "./cards/InfoCards/ClientInfo";
import CriminalTypeInfo from "./cards/InfoCards/CriminalTypeInfo";
import CriminalInfo from "./cards/InfoCards/CriminalInfo";
import EvidenceInfo from "./cards/InfoCards/EvidenceInfo";
import PunishmentInfo from "./cards/InfoCards/PunishmentInfo";
import SourceInfo from "./cards/InfoCards/SourceInfo";
import SuspectInfo from "./cards/InfoCards/SuspectInfo";

export default {
  name: "DialogInfoTable",
  components: {HumanInfo, PerformerInfo, AddressInfo, CaseInfo, ClientInfo, CriminalTypeInfo, CriminalInfo,
    EvidenceInfo, PunishmentInfo, SourceInfo, SuspectInfo},
  props: {
    item: null,
    urlProps: String,
    nav_context: String
  },
  data: () => ({
    dialog: true,
    data: null,
    baseUrl: 'http://localhost:10511'
  }),
  methods: {
    changeDialog() {
      this.dialog = false
      this.$emit('changeFlag', {
        flag: false
      })
    },
    getInfoById() {
      axios.create({
        baseURL: this.baseUrl
      }).get(this.urlProps + '/' + this.item.id).then(resp => {
        this.data = resp.data
      })
    }
  },
  beforeMount() {
    this.getInfoById()
  },
}
</script>

<style scoped>

</style>