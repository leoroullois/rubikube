import type { AppProps } from "next/app";
import Layout from "@components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import "@scss/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ChakraProvider>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </ChakraProvider>
   );
}

