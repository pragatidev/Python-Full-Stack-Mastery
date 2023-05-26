<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <button @click="editPost(post)">Edit</button>
      <button @click="deletePost(post.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { getPosts, deletePost } from '@/api.js'

export default {
  data() {
    return {
      posts: []
    }
  },
  methods: {
    editPost(post) {
      this.$router.push({ name: 'UpdatePost', params: { id: post.id } });
    },
    async deletePost(id) {
      await deletePost(id);
      this.posts = this.posts.filter(post => post.id !== id);
    }
  },
  async created() {
    const response = await getPosts();
    this.posts = response.data;
  }
}
</script>