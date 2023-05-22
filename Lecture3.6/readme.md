# 3.6 Hands-on: Building a Simple Vue.js App

Welcome to the hands-on session of building a simple Vue.js app. In this session, we'll construct our very first Vue.js app from the ground up.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed. You can verify whether you have Node.js installed by running the following command in your terminal:

    node -v

You should see the version of your Node.js. Now, check whether npm is installed:

    npm -v

You should see the version of npm.

## Step 1: Install Vue CLI

Firstly, we need to install Vue CLI. Open your terminal, and type the following command to install Vue CLI globally:

    npm install -g @vue/cli

## Step 2: Create Vue.js project

Navigate to your desired directory and create a new Vue.js project:

    vue create my-first-vue-project

Replace 'my-first-vue-project' with the name of your project. When prompted, choose the default preset.

## Step 3: Create a new Vue component for our TaskList

Navigate to the `src/components` directory and create a new file named `TaskList.vue`. Here's what the content of the file should look like:

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

## Step 4: Use TaskList component in our App

Next, navigate back to the `src` directory and open `App.vue`. Replace the content with the following:

    <template>
      <div id="app">
        <TaskList/>
      </div>
    </template>

    <script>
    import TaskList from './components/TaskList.vue'

    export default {
      components: {
        TaskList
      }
    }
    </script>

## Step 5: Run the app

Return to the terminal, make sure you're in the root directory of your project and type the following command to start your Vue.js application:
    
    cd my-first-vue-project
    npm run serve

Open your web browser and navigate to `http://localhost:8080/`. If you see an input box and a list (which will initially be empty), you've successfully set up your Vue.js project!

Feel free to add tasks by typing into the input box and pressing Enter. Each task will appear as a new item in the list below the input box.

Congratulations! You've created a simple Vue.js app. Enjoy exploring Vue.js!
