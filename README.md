# Simple_Blog_Application

## Table of Contents

- Installation :
- Usage
- Docker Usage
- Features


### Prerequisites

- Node.js (version 22.17.0)
- Angular CLI (18.2.1)
- Docker
- Docker-Compose

  
## Installation Steps

1. Clone the repository:
    ```bash
    git clone git@github.com:sumonDev13/Simple_Blog_Application-nodeJS-angularJS.git
    cd yourproject
    ```

2. Navigate to the NodeJS project directory and install dependencies:
    ```bash
    cd server
    npm install
    npm run dev
    ```
3. Navigate to the AngularJS project directory and install dependencies:
    ```bash
    cd client
    npm install
    npm start
    ```

## Docker Usage:
1.Client
```bash
    cd client
    docker build . -t blog-client
    docker run -p 8008:80 -d blog-client
```
2.Server
```bash
    cd server
    docker build . -t my-app:1.0
    docker run my-app:1.0
```



### Run the Application on Docker Container
 ```bash
    cd simple_blog_application
    docker-compose build
    docker-compose up
 ```

### Test the server endpoint
 ```bash
    cd server
    npm test
 ```

## Features


● Backend Development (Node.js):
○ Written a RESTful API to handle the CRUD operations for blog posts.
○ Each blog have the following properties:
■ id (unique identifier)
■ title (string)
■ content (string)
■ author (string)
■ created_at (timestamp)


● Frontend Development (Angular.js):

○ a simple interface where users can:
■ View a list of blog posts.
■ Create a new blog post.
■ Edit an existing blog post.
■ Delete a blog post.
○ Frontend connected properly with the backend API.


