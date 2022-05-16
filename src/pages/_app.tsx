import type { AppProps } from "next/app";
import Layout from "@components/layout";
import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@store/store";

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <Provider store={store}>
         <ThemeProvider enableSystem={true} attribute='class'>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </ThemeProvider>
      </Provider>
   );
};

export default App;

