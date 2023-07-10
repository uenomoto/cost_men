import Head from "next/head";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { SuccessButton } from "../../components/button/SuccessButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>cost_men</title>
      </Head>
      <div className="container mx-auto">
        <div className="text-lg">Hello Next! Hello Vercel!</div>
        <div className="mt-2 inline-block cursor-pointer">
          <PrimaryButton>Primary Button</PrimaryButton>
        </div>
        <div className="mt-2 inline-block cursor-pointer">
          <SuccessButton>Success Button</SuccessButton>
        </div>
      </div>
    </>
  );
}
