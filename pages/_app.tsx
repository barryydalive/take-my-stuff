import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "2rem" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
