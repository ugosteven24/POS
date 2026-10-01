import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Menu from "./menu";
import { ToastProvider } from "@/components/Toast";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hotel reservation",
  description: "Book your perfect stay with us",
};

export default function AdminLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>

        {/* AdminLTE CSS */}
        <link
          rel="stylesheet"
          href="/plugins/fontawesome-free/css/all.min.css"
        />

        <link
          rel="stylesheet"
          href="/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
        />

        <link
          rel="stylesheet"
          href="/dist/css/adminlte.min.css"
        />




      </head>

      <body>
        <Menu />
        <ToastProvider>
          {children}
          <Toaster position="top-right" />
        </ToastProvider>

        {/* jQuery */}
        <Script
          src="/plugins/jquery/jquery.min.js"
          strategy="beforeInteractive"
        />

        {/* jQuery UI */}
        <Script
          src="/plugins/jquery-ui/jquery-ui.min.js"
          strategy="afterInteractive"
        />

        {/* jQuery UI Button Bridge */}
        <Script id="jquery-ui-bridge" strategy="afterInteractive">
          {`
            window.addEventListener("load", function () {
              if (window.jQuery && window.jQuery.ui) {
                window.jQuery.widget.bridge(
                  "uibutton",
                  window.jQuery.ui.button
                );
              }
            });
          `}
        </Script>

        {/* Bootstrap */}
        <Script
          src="/plugins/bootstrap/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Chart.js */}
        <Script
          src="/plugins/chart.js/Chart.min.js"
          strategy="afterInteractive"
        />

        {/* Sparklines */}
        <Script
          src="/plugins/sparklines/sparkline.js"
          strategy="afterInteractive"
        />

        {/* jQVMap */}
        <Script
          src="/plugins/jqvmap/jquery.vmap.min.js"
          strategy="afterInteractive"
        />

        <Script
          src="/plugins/jqvmap/maps/jquery.vmap.usa.js"
          strategy="afterInteractive"
        />

        {/* jQuery Knob */}
        <Script
          src="/plugins/jquery-knob/jquery.knob.min.js"
          strategy="afterInteractive"
        />

        {/* Moment */}
        <Script
          src="/plugins/moment/moment.min.js"
          strategy="afterInteractive"
        />

        {/* Date Range Picker */}
        <Script
          src="/plugins/daterangepicker/daterangepicker.js"
          strategy="afterInteractive"
        />

        {/* Tempus Dominus */}
        <Script
          src="/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"
          strategy="afterInteractive"
        />

        {/* Summernote */}
        <Script
          src="/plugins/summernote/summernote-bs4.min.js"
          strategy="afterInteractive"
        />

        {/* Overlay Scrollbars */}
        <Script
          src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
          strategy="afterInteractive"
        />

        {/* AdminLTE */}
        <Script
          src="/dist/js/adminlte.js"
          strategy="beforeInteractive"
        />

        {/* Demo */}
        <Script
          src="/dist/js/demo.js"
          strategy="afterInteractive"
        />

        {/* Dashboard */}
        <Script
          src="/dist/js/pages/dashboard.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}