import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AppWrapper } from "@/context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REST-aurant",
  description:
    "Web application component of a SOA system. Used to handle menu, reservation and clients of a restaruant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <AppWrapper>
            <Navbar />
            {children}
            <Footer />
          </AppWrapper>
        </div>
      </body>
    </html>
  );
}
