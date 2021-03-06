import axios from "axios";

export default {
  getPosts: function (postType) {
    return axios.get("/api/" + postType)
  },
  getSinglePost: function (postType, id) {
    return axios.get("/api/" + postType + "/" + id)
  },
  getQueryPosts: function (postType, param) {
    return axios.post("/api/" + postType + "/filter" + param)
  },
  auth: function (authRoute, user) {
    return axios.post("/api/auth/" + authRoute, user)
  },
  logoutUser: function () {
    return axios.get("/api/auth/logout")
  },
  signUp: function (newUser) {
    return axios.post("/api/auth/signup", newUser)
  },
  user: function () {
    return axios.get("/api/auth/user")
  },

  newPost: function (postType, post) {
    console.log("newPost", postType, post);

    return axios.post("/api/" + postType, post)
  },
  deletePost: function (postType, postId) {
    return axios.delete("/api/" + postType + "/" + postId)
  },
  updatePost: function (postType, postId, post) {
    return axios.put("/api/" + postType + "/" + postId, post)
  }
}