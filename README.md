# Readable

 Readable is a content and comment web application developed using React and Redux.This application allows users to post content to predefined categories, comment on their posts
 and other user's posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

 This repository includes the code for the front end portion.

### Pages:
    DefaultView - Allows users to see all posts independent of category and to add post in any category.
    CategoryView - Allows users to view posts based on category. It also allows users to add new post.
    PostDetailView - Allows users to view post in detail along with its associated comments.
    CreateEditPostView - Allows users to create or update Post details

# Quickstart

### Install

    $ npm install
    $ npm start


#### API

    $ git clone https://github.com/udacity/reactnd-project-readable-starter.git
    $ cd api-server
    $ npm install
    $ npm start

#API provides below Endpoints

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  |
| `GET /:category/posts` | Get all of the posts for a particular category. |  |
| `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
| `GET /posts/:id` | Get the details of a single post. | |
| `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
| `GET /posts/:id/comments` | Get all the comments for a single post. | |
| `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
| `GET /comments/:id` | Get the details for a single comment. | |
| `POST /comments/:id` | Used for voting on a comment. | |
| `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |