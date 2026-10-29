import { GoogleTagManager } from "@next/third-parties/google";
import { Manrope, Sora } from "next/font/google";
import AnimatedCursor from "./components/AnimatedCursor";
import ClientChatBot from "./components/chatbot/ClientChatBot";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import ToastContainerWrapper from "./components/helper/toast-container";
import Navbar from "./components/navbar";
import Providers from "./providers";
import { personalData } from "@/utils/data/personal-data";
import "./css/globals.scss";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: `${personalData.name} | Software & Mobile Developer`,
  description: personalData.tagline,
  keywords: [
    "Elvin Humura",
    "Software Developer",
    "Mobile Developer",
    "Full Stack Developer",
    "Rwanda",
    "Flutter",
    "Next.js",
    "Spring Boot",
  ],
  openGraph: {
    title: `${personalData.name} | Software & Mobile Developer`,
    description: personalData.tagline,
    type: "website",
    images: ["/card.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070708" },
  ],
};

// Runs before paint so the saved theme applies without a flash.
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (!t) { t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
    document.documentElement.classList.add(t);
  } catch (e) { document.documentElement.classList.add('dark'); }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <ToastContainerWrapper />
        <Providers>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <ScrollToTop />
          <ClientChatBot />
          <AnimatedCursor />
        </Providers>
      </body>
      {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
    </html>
  );
}
