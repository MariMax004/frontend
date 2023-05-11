<template>
  <div>
    <v-alert
        dismissible
        type="error"
        @click="getBackFlag"
    >
      {{ errorText }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertCard",
  props: {
    errorText: String,
    flag: Boolean
  },
  data: () => ({
  }),
  methods:{
    getBackFlag(){
      this.$emit('updateAlert', {
        flag:false
      })
    }
  }
}
</script>

<style scoped>

</style>