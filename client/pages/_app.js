import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </RecoilRoot>
  );
}
