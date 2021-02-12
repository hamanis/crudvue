
<template>
  <div class="q-pa-md">

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <!-- <h5 v-if="id" style="margin-left: 40px">Editing post</h5>
        <h5 v-else style="margin-left: 40px">New post</h5> -->
        <q-card-section class="row items-center">

          <div v-if="name || newUser" class="q-pa-md" style="min-width: 500px">
            <q-input
              v-model="name"
              label="Name"
              filled
            />
          </div>

          <div class="q-pa-md" style="min-width: 500px">
            <q-input
              v-model="title"
              label="Title"
              filled
            />
          </div>

          <div class="q-pa-md" style="min-width: 500px">
            <q-input
              v-model="caption"
              filled
              type="textarea"
              label="Body"
            />
          </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Exit" color="red" v-close-popup @click="exit()"/>
          <q-btn flat label="Save" color="green" @click="save()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import axios from 'axios';

export default defineComponent({
  name: 'PageEdit',
  data ()
  {
    return {
      name: <String>'',
      title: <String>'',
      caption: <String>'',
      dialog: <boolean>true,
      id: '',
      userId: '',
      newUser: <boolean>false
    }
  },
  mounted ()
  {
    this.id = this.$route.params.id;

    if (this.id) {
      axios.get('http://localhost:3000' + this.$route.matched[1].path + '/' + this.$route.params.id).then((response) => {
          switch (this.$route.matched[1].path) {
              case '/posts':
                  this.title = response.data.title;
                  this.caption = response.data.body;
                  this.userId = response.data.userId;
                  break;
              case '/users':
                  this.name = response.data.name;
                  this.title = response.data.email;
                  this.caption = response.data.username;
                  break;
          }
      });
    }
    else if (this.$route.matched[1].path == '/users') {
        this.newUser = true;
    }
  },
  methods: {
      save ()
      {
          let data = {};

          switch (this.$route.matched[1].path) {
              case '/posts':
                  data = {
                      title: this.title,
                      body: this.caption,
                      userId: this.id == '' ? '1' : this.userId
                  };
                  break;
              case '/users':
                  data = {
                      name: this.name,
                      email: this.title,
                      username: this.caption
                  };
                  break;
              default:
                  return;
          }

          if (typeof this.id !== 'undefined') {
              axios.put('http://localhost:3000' + this.$route.matched[1].path + '/' + this.id, data).then((response) => {
                  this.$router.push({ path: this.$route.matched[1].path });
              });
          }
          else {
              axios.post('http://localhost:3000' + this.$route.matched[1].path, data).then((response) => {
                  this.$router.push({ path: this.$route.matched[1].path });
              });
          }
      },
      exit ()
      {
          this.$router.push({ path: this.$route.matched[1].path });
      }
  }
});
</script>
