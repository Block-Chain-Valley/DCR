import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const getBaseApi = () => {
  const request = axios.create({
    baseURL: process.env.NAVER_MOVIE_SEARCH_URL,
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    },
  });
  return request;
};

const searchMovies = (queries: any) => {
  const request = getBaseApi();
  return request({
    method: "get",
    url: "/v1/search/movie",
    params: queries,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queries = req.query;
  try {
    // console.log(searchMovies(queries));
    const { data, status } = await searchMovies(queries);
    console.log(data, status);

    res.status(status).json(data);
  } catch (e) {
    console.log(e);
    res.status(401).json({
      display: 0,
      items: [],
      lasBuildDate: new Date(),
      start: 1,
      total: 0,
    });
  }
}
