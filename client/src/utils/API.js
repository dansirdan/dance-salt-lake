import axios from "axios";

export default {
  getPosts: function (postType) {
    return axios.get("/api/" + postType)
  },
  getSinglePost: function (postType, id) {
    return axios.get("/api/" + postType + "/" + id)
  },
  getQueryPosts: function (postType, subType, param) {
    return axios.get("/api/" + postType + "/" + subType + "/" + param)
  },
  auth: function (logReg, userInfo) {
    return axios.post("/api/auth/" + logReg, userInfo)
  }
}