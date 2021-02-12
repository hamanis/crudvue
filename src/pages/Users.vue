<template>
    <div class="q-pa-md">
      <router-link to="users/create">
          <q-btn outline rounded color="primary" label="New user"></q-btn>
      </router-link>

        <List
          v-for="(user, i) in users"
          :key="i"
          :title="user.name"
          :id="user.id"
          :caption="user.email"
          :name="user.username"
          :typeview="typeview"
        />

        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import axios from 'axios';
import { User, Post } from 'components/models';
import List from 'components/ListComponent.vue';

export default defineComponent({
    name: 'PageUsers',
    components: { List },
    data ()
    {
      return {
        users: <User[]>[],
        typeview: 'user'
      };
    },
    mounted ()
    {
      this.loadUsers();
    },
    updated ()
    {
      this.loadUsers();
    },
    methods: {
      loadUsers()
      {
        axios.get('http://localhost:3000/users').then((response) => {
          this.users = response.data;
        });
      }
    }
});
</script>