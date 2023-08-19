<template>
    <q-dialog v-model="alert">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title> {{ toolbartitle }} </q-toolbar-title>
            <q-btn flat @click="close" v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
        <q-page-container style="max-width: 1000px;">
          <q-page padding>
            <div class="q-pa-md" style="max-width: 1000px">
              <slot></slot>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<style>
</style>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    toolbartitle: {
      type: String,
      default: "",
    },
  },
  emits: ['close-dialog'],
  setup(props, ctx) {
    
    const close = () => {
      ctx.emit("close-dialog");
    }
    const alert = ref(false);
    watch(() => props.showDialog, (value) => {
      alert.value = value;
    });
    return {
      alert,
      close,
    }
  }
}
</script>