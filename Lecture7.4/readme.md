# Full-Stack Application: A Blogging Platform using Django and Vue.js
In this project, we will be creating a blogging platform where users can create, read, update, and delete posts. We will use Django for the backend, Vue.js for the frontend, and Django REST Framework to handle API requests.

## Prerequisites
Ensure that you have the following installed:

- Python
- Django
- Django REST Framework
- Node.js and npm
- Vue CLI
- Axios

If not installed, you can install these packages using pip for Python/Django related packages and npm for Node.js/Vue.js related packages.

## Step 1: Set up the Django Project and App
Firstly, open your terminal and create a new Django project named blogProject and a Django app within it named blogApp by running the following commands:
````
django-admin startproject blogProject
cd blogProject
python manage.py startapp blogApp
````
## Step 2: Create the Post Model
In your blogApp/models.py, define a Post model with fields for title, content, and author.
````
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
````

After defining the model, update blogProject/settings.py to include blogApp in the INSTALLED_APPS section.

In your settings.py file, add 'blogApp' and 'rest_framework' to your INSTALLED_APPS list:

```python
INSTALLED_APPS = [
    ...  # other apps
    'blogApp',
    'rest_framework',
]
```

Then, run the following commands to apply migrations:
````
python manage.py makemigrations blogApp
python manage.py migrate
````
Now, create a superuser for testing purposes:
````
python manage.py createsuperuser
````

## Step 3: Set up Django REST Framework
Next, we need to set up Django REST Framework (DRF) and create a serializer for our Post model.

In blogApp/serializers.py, create a serializer for the Post model:
````
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author']
````
Then, in blogApp/views.py, create an API view for the Post model:
````
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
````
Lastly, in blogApp/urls.py, we need to create the API URLs:
````
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blogApp.views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
````
Now, in your blogProject/urls.py, include the blogApp urls:
````
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blogApp.urls')),
]

````

## Step 4: Create a Vue.js Application
Having set up our Django API, let's switch gears and create a new Vue.js application for our frontend.

First, install Vue CLI if you haven't done so already:
```
npm install -g @vue/cli
```
Now, create a new Vue project:
````
vue create blogclient
````
Navigate to the new project directory:
````
cd blogclient
````
Then, install Axios:
````
npm install axios
````
## Step 5: Connect Vue.js to Django API
In the src/ directory of our Vue.js application, let's create a new file called api.js:
````javascript
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export function getPosts() {
    return axios.get(`${API_URL}/posts/`);
}

export function createPost(data) {
    return axios.post(`${API_URL}/posts/`, data);
}

export function updatePost(id, data) {
    return axios.put(`${API_URL}/posts/${id}/`, data);
}

export function deletePost(id) {
    return axios.delete(`${API_URL}/posts/${id}/`);
}

export function getPost(id) {
    return axios.get(`${API_URL}/posts/${id}/`);
}

````
Now, in our Vue.js components, we can import these functions and use them to interact with our Django API.

Now, create different Vue components under 'src/components/' directory to display and modify posts, and use the functions defined in api.js to make requests to your backend.

Here's an example of a PostList.vue component:
````
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

````

And a CreatePost.vue component:
````
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

````

and UpdatePost.vue
````
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
````

To use these components, you'll have to configure your Vue Router: configure in 'src/router/index.js'
````
import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList.vue'
import CreatePost from '@/components/CreatePost.vue'
import UpdatePost from '@/components/UpdatePost.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/create',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/update/:id',
      name: 'UpdatePost',
      component: UpdatePost,
      props: true
    }
  ]
})
````
App.vue content 
````
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
````

main.js
````
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
````

Use Vue Router to navigate between these components. For example, you'd go to /posts to see the list of posts, /create to create a new post, /update/:id to update a post, etc.

## CORS (Cross-Origin Resource Sharing) Handling
To handle CORS, you can add django-cors-headers to your Django application. First, install it via pip:

````
pip install django-cors-headers
````
Then add it to your INSTALLED_APPS:
````
INSTALLED_APPS = [
    ...,
    'corsheaders',
    ...
]
````
Add the following middleware:

````
MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
````
Lastly, allow all origins to make requests to your Django application:
````
CORS_ORIGIN_ALLOW_ALL = True
````
Remember, in a production setting, you should limit this to the specific domains that should access your application.
## Step 6: Start the Django and Vue.js Servers
To start your Django server, navigate to the root of your Django project and run the following command:
````
python manage.py runserver
````
Your Django server will now be running on http://localhost:8000.

Next, to start your Vue.js server, navigate to the root of your Vue.js project and run the following command:
````
npm run serve
````
Your Vue.js server will now be running on http://localhost:8080.

## Step 7: Build and Test Your Full-Stack Application
The final step is to build your Vue.js application:

````
npm run build
````
Now, navigate to http://localhost:8080 in your web browser. You should be able to create, read, update, and delete posts through your Vue.js frontend, with the changes reflected in your Django backend.