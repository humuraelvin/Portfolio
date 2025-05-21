import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import ToastContainerWrapper from "./components/helper/toast-container";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import Providers from "./providers";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elvin HUMURA | Portfolio",
  description:
    "This is the portfolio of Elvin HUMURA. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ToastContainerWrapper />
        <Providers>
          <main className="min-h-screen relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[100rem] text-white overflow-hidden">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </Providers>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
