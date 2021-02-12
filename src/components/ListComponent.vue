
<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
   
    <q-item-section side top>
      <q-item-label caption>{{ name }}</q-item-label>
    </q-item-section>
 
    <q-btn-group rounded>
      <q-btn rounded color="primary" label="Edit" :to="{ name: 'edit' + typeview, params: { id: id }}"></q-btn>
 
      <q-btn rounded color="red" label="Delete" @click="remove()"></q-btn>
    </q-btn-group>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import axios from 'axios';

export default defineComponent({
  name: 'List',
  props: {
    title: {
      type: String
    },
    caption: {
      type: String
    },
    name: {
      type: String
    },
    typeview: {
      type: String
    },
    id: {
      type: Number
    }
  },
  methods: {
    remove () {
      axios.delete('http://localhost:3000/' + this.typeview + 's/' + this.id,).then((response) => {
        this.$router.push({ path: '/' + this.typeview + 's' });
      });
    }
  }
});
</script>
