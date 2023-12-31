import "@/styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Layout } from "../../components/Layout";
import { Sidebar } from "../../components/Sidebar";
import { Motions } from "../../utils/Motions";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideSidebarPages = ["/user/login", "/user/signup", "/"];

  // ログイン、サインアップ、ホームページでサイドバーを非表示
  const hideSidebar = hideSidebarPages.includes(router.pathname);

  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}/recipes`;

  return (
    <>
      <RecoilRoot>
        <Auth0Provider
          domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
          clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
          authorizationParams={{
            redirect_uri: redirectUri,
            audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"],
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {!hideSidebar && (
              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            )}
            <div className="lg:col-span-11 md:col-span-1 max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <Motions key={router.route}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Motions>
              </AnimatePresence>
            </div>
          </div>
        </Auth0Provider>
      </RecoilRoot>
    </>
  );
}
