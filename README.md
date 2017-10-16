## Project Details
Application: Readable Application in React
Description: Readable is a content and comment application, which allows users to view all posts or to view posts based on a category.It also
allows users to Add/Update/Delete/Upvote/DownVote posts and Add/Update/Delete/Upvote/DownVote  comments for a post
Program: Udacity React Nanodegree Program
Developed By: Swathi Kajjam


## Pages:
DefaultView - Allows users to see all post independent of category.
CategoryView - Allows users to view posts based on category. It also allows users to add new post in selected category.
PostDetailView - Allows users to view post in detail along with its associated comments.
CreateEditPostView - Allows users to create or update Post details

## Installation Instruction:
#Note: If service is not running on port 3001, please run below command with the port on which service is running
export REACT_APP_BACKEND = 'http://localhost:3001'
npm install
npm start


## Important
The backend API provides the following endpoints

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

