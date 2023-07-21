import { NextApiRequest, NextApiResponse } from "next";

// ログイン時に、Cookieにトークンを保存する(rails側に送れず断念)
const handleAuth = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    `token=${req.body.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${
      60 * 60 * 24 * 30
    }`
  ); // 30 days
  res.status(200).json({ status: "success" });
};

export default handleAuth;
