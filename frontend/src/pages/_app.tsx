import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Sidebar } from "../../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideSidebarPages = ["/user/login", "/user/signup", "/"];

  // ログイン、サインアップ、ホームページでサイドバーを非表示
  const hideSidebar = hideSidebarPages.includes(router.pathname);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-12">
      {!hideSidebar && (
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
      )}
      <div
        className={`lg:col-span-${hideSidebar ? "12" : "10"} md:col-span-12`}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </div>
  );
}
