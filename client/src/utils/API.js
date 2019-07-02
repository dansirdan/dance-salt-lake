import axios from "axios";

export default {
  getPosts: function(postType) {   
    return axios.get("/api/" + postType)
  },
  getSinglePost: function(postType, id) {   
    return axios.get("/api/" + postType+ "/" + id)
  }
}