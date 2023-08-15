<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="content_paste_search" color="black" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            CepSearch
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <router-link :to="link.path"  style="text-decoration: none; color: inherit;"  v-for="link in links1" :key="link.text">
            <q-item v-ripple clickable>
              
                <q-item-section avatar>
                  <q-icon color="grey" :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              
            </q-item>
          </router-link>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const search = ref('')

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {

      leftDrawerOpen,
      search,

      toggleLeftDrawer,

      links1: [
        { icon: 'list', text: `Todos`, path:"/" },
        { icon: 'search', text: `Buscar`, path:"/about" },
      ],
      
    }
  }
}
</script>
<style>
 .YL__toolbar-input-container {
  width: 50%;
 }
 .q-list--padding{
  margin: 0 !important;
  padding: 0 !important;
 }
</style>