<template>
  <div id="task-list">
    <input v-model="newTask" @keyup.enter="addTask">
    <ul>
      <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    }
  },
  methods: {
    addTask() {
      if (this.newTask !== '') {
        this.tasks.push(this.newTask)
        this.newTask = ''
      }
    }
  }
}
</script>