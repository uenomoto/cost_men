// このページは削除する
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
// recoil
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atoms/tokenState";

// 遷移したblogページでRecoilからTokneを取得できるか確認
const BlogPage: NextPage = () => {
  // 投稿や削除や認証がないとできないことや遷移できないページは全て↓記述すること
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  // console.log(token);

  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const onClick = () => {
    const parems = {
      title: title,
      caption: caption,
    };
    console.log(token);

    axios
      .post(`${process.env.NEXT_PUBLIC_IP_ENDPOINT}/posts`, parems, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  // 投稿一覧一回限り取得する。変更があるたびに再レンダリングする。
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/posts`
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <label htmlFor="">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e, setTitle);
        }}
      />
      <br />
      <label htmlFor="">本文</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => {
          onChange(e, setCaption);
        }}
      />
      <br />
      <button onClick={onClick}>新規投稿</button>
    </div>
  );
};

export default BlogPage;
