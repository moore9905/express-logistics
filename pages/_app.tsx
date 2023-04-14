import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
const queryClient = new QueryClient();
if (typeof document === "undefined") {
  // @ts-ignore global.document = { querySelector: function () {}, };
}
const poppins = Poppins({ subsets: ['latin'], weight: "400" })
export default function App({ Component, pageProps, router }: AppProps) {
  return <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
    <AnimatePresence mode="wait" initial={false}>
    <div className={`${poppins.className}`}>
  <Component {...pageProps} key={router.asPath} />
  </div>
    </AnimatePresence>
        </Hydrate>
        </QueryClientProvider>
}
