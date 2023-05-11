import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/auth/AuthPage.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/app/MainPage.vue')
  },
  {
    path: '/performer',
    name: 'Performer',
    component: () => import('../views/app/PerformerPage.vue')
  },
  {
    path: '/case',
    name: 'Case',
    component: () => import('../views/app/CasePage.vue')
  },
  {
    path: '/client',
    name: 'Client',
    component: () => import('../views/app/ClientPage.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/app/AddressPage.vue')
  },
  {
    path: '/evidence',
    name: 'Evidence',
    component: () => import('../views/app/EvidencePage.vue')
  },
  {
    path: '/suspect',
    name: 'Suspect',
    component: () => import('../views/app/SuspectPage.vue')
  },
  {
    path: '/source',
    name: 'Source',
    component: () => import('../views/app/SourcePage.vue')
  },
  {
    path: '/criminal',
    name: 'Criminal',
    component: () => import('../views/app/CriminalPage.vue')
  },
  {
    path: '/punishment',
    name: 'Punishment',
    component: () => import('../views/app/PunishmentPage.vue')
  },
  {
    path: '/crimetype',
    name: 'CrimeType',
    component: () => import('../views/app/CrimeTypePage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
