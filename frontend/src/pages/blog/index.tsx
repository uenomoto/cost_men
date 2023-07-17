// このページは削除する
import { NextPage } from "next";
import React, { useEffect } from "react";
import axios from "axios";
// recoil
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atoms/tokenState";

// 遷移したblogページでRecoilからTokneを取得できるか確認
const BlogPage: NextPage = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://192.168.2.108:3000/api/v1/posts");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  });

  return <div>ブログ投稿</div>;
};

export default BlogPage;
