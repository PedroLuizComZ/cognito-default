import Amplify from 'aws-amplify';
import type { AppProps } from "next/app";
import awsExports from '../aws-exports';
import '../styles/global.css';

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
export default MyApp;
