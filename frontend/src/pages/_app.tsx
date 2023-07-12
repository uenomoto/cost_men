import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../../components/Layout";
import { Sidebar } from "../../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-2 lg:block">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 md:col-span-12">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </div>
    </>
  );
}
