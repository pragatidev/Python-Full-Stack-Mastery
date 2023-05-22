# Lecture 3.1: Setting Up a Vue.js Project

Welcome to Lecture 3.1. In this hands-on lecture, we will be setting up our first Vue.js project. By the end of this guide, you should have a Vue.js project up and running on your machine.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed. You can verify whether you have Node.js installed by running the following command in your terminal:

    node -v

You should see the version of your Node.js. Now, check whether npm is installed:

    npm -v

You should see the version of npm.

If not, you can download both from [here](https://nodejs.org/).

## Step 1: Install Vue CLI

Vue CLI is a standard tooling baseline for the Vue.js framework. To install Vue CLI, open your terminal and run the following command:
```npm install -g @vue/cli```

## Step 2: Create a Vue.js Project

Navigate to the directory where you want to create your project and run the following command:

```vue create my-first-vue-project```

Replace 'my-first-vue-project' with the name you prefer for your project.

When asked to pick a preset, choose the default preset (Babel, ESLint) for the most straightforward setup.

## Step 3: Run the Project

Navigate into the new project directory and start the project.

```
cd my-first-vue-project
npm run serve
```

Your Vue.js application will be running on http://localhost:8080 (unless you have other processes running on that port).

Congratulations! You have successfully set up your first Vue.js project. 

In our upcoming sessions, we will delve deeper into the world of Vue.js, exploring its components, directives, and more. Happy Coding!
