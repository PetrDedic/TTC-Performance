import { ColorSchemeScript } from "@mantine/core";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KQFLLTTV');
            `,
          }}
        />
        <style>
          {`
          #spin-cont {
            position: fixed;
            top:0;
            left:0;
            width: 100vw;
            height: 100vh;
            background-color:rgba(16, 28, 36, 1);
            z-index:99999999;

            display:flex;
            flex-direction: column;
            justify-content: center;
            pointer-events: none;
            transition: 500ms;
          }

          #spin-cont.hidden {
            opacity: 0;
          }
          
          #spinner {
            display:flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-weight: 700;
            font-size: 1.25rem;
            color: rgba(16, 28, 36, 1);
            width: 56px;
            height: 56px;
            border-radius: 5px;
            background: #f7f7f7;
            animation: rotate 1.2s infinite ease-in-out;
            margin: auto;
            pointer-events: none;
          }

          #loader-text {
            text-align: center;
            margin: auto;
            font-size: 2rem;
          }

          @keyframes rotate {
            0% {
              transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            }
            50% {
              transform: perspective(120px) rotateY(0deg);
            }
            100% {
              transform: perspective(120px) rotateY(-359.9deg);
            }
          `}
        </style>
        <ColorSchemeScript defaultColorScheme="light" />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQFLLTTV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <div id="top"></div>
        <div id="spin-cont">
          <div id="spinner">TTC</div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
