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

  const [name, setName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");

  const onClick = () => {
    const parems = {
      supplier: {
        name: name,
        contact_info: contactInfo,
      },
    };
    console.log(token);

    axios
      .post(`${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`, parems, {
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
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [token]);

  return (
    <div>
      <label htmlFor="name">名前</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => {
          onChange(e, setName);
        }}
      />
      <br />
      <label htmlFor="contactInfo">本文</label>
      <input
        type="text"
        name="contactInfo"
        id="contactInfo"
        value={contactInfo}
        onChange={(e) => {
          onChange(e, setContactInfo);
        }}
      />
      <br />
      <button onClick={onClick}>新規投稿</button>
    </div>
  );
};

export default BlogPage;
