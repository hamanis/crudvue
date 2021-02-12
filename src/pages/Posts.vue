<template>
    <div class="q-pa-md">
      <router-link to="posts/create">
          <q-btn outline rounded color="primary" label="New post"></q-btn>
      </router-link>

      <List
        v-for="(post, i) in posts"
        :key="i"
        :title="post.title"
        :id="post.id"
        :caption="post.body"
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
    name: 'PagePosts',
    components: { List },
    data ()
    {
      return {
        posts: <Post[]>[],
        typeview: 'post'
      };
    },
    mounted ()
    {
      this.loadPosts();
    },
    updated ()
    {
      this.loadPosts();
    },
    methods: {
      removePost (postId: string)
      {
          axios.delete('http://localhost:3000/posts/' + postId,).then((response) => {
            this.$router.push({ path: '/posts' });
          });
      },
      loadPosts()
      {
        axios.get('http://localhost:3000/posts').then((response) => {
          let posts = <Post[]>response.data;

          posts.sort((left, right): number => {
            if (left.id < right.id) {
              return 1;
            }

            if (left.id > right.id) {
              return -1;
            }

            return 0;
          });

          this.posts = posts;
        });
      }
    }
});
</script>