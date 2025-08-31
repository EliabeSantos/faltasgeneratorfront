import type { AppProps } from "next/app";
import "../static/jank-empty.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
