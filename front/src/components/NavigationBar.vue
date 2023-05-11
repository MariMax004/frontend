<template>
  <v-card height=100% class="rounded-0">
    <v-navigation-drawer permanent color="indigo darken-4" dark width=100%>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Data Base
          </v-list-item-title>
          <v-list-item-subtitle>
            objects
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link @click="goTo(item.to)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import router from "@/router";

export default {
  name: "Human",
  data: () => ({
    items: [
      {title: 'Human', icon: 'mdi-account-multiple-outline', to: '/main'},
      {title: 'Performer', icon: 'mdi-account-cog', to: '/performer'},
      {title: 'Case', icon: 'mdi-briefcase-search-outline', to: '/case'},
      {title: 'Client', icon: 'mdi-account-multiple-outline', to: '/client'},
      {title: 'Address', icon: 'mdi-home', to: '/address'},
      {title: 'Evidence', icon: 'mdi-clipboard-text-search-outline', to: 'evidence'},
      {title: 'Suspect', icon: 'mdi-account-search', to: '/suspect'},
      {title: 'Source', icon: 'mdi-book-open-variant', to: '/source'},
      {title: 'Criminal', icon: 'mdi-account-lock-outline', to: '/criminal'},
      {title: 'Punishment', icon: 'mdi-grid', to: '/punishment'},
      {title: 'Crime Type', icon: 'mdi-palette-swatch-variant', to: '/crimetype'},
    ],
    right: null,
  }),
  methods:{
    goTo(param){
      router.push({path:param})
    },
  }
}
</script>

<style scoped>

</style>