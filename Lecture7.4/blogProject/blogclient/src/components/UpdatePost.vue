<template>
  <div>
    <h1>Update Post</h1>
    <form @submit.prevent="updatePost">
      <input v-model="title" placeholder="Title">
      <textarea v-model="content" placeholder="Content"></textarea>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { getPost, updatePost } from '@/api.js'

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async updatePost() {
      await updatePost(this.$route.params.id, {
        title: this.title,
        content: this.content,
        // You'll need to get the author ID another way.
        // This is a placeholder.
        author: 1
      });
      this.$router.push({ name: 'PostList' });
    }
  },
  async created() {
    const response = await getPost(this.$route.params.id);
    this.title = response.data.title;
    this.content = response.data.content;
  }
}
</script>