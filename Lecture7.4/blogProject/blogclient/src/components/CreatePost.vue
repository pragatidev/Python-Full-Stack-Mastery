<template>
  <div>
    <h1>Create a Post</h1>
    <form @submit.prevent="createPost">
      <input v-model="title" placeholder="Title">
      <textarea v-model="content" placeholder="Content"></textarea>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { createPost } from '@/api.js'

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async createPost() {
      await createPost({
        title: this.title,
        content: this.content,
        // You'll need to get the author ID another way.
        // This is a placeholder.
        author: 1
      });
      this.$router.push({ name: 'PostList' });
    }
  }
}
</script>