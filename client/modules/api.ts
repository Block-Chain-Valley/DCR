import axios from "axios";

const getBaseApi = () => {
  const request = axios.create({
    withCredentials: false,
  });
  return request;
};

const searchMoviesApi = (queries: any): any => {
  const request = getBaseApi();
  // return request({ url: "/api/movie", params: queries });
  return request({
    method: "get",
    url: "https://api.themoviedb.org/3/search/movie",
    params: queries,
  });
};

export default searchMoviesApi;
