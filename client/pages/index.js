import dynamic from "next/dynamic";

const App = dynamic(
  () => {
    return import("./App");
  },
  { ssr: false }
);

export default function Home() {
  return <App />;
}
