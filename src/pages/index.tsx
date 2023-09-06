import Image from "next/image";
import SumsubWebSdk from "@sumsub/websdk-react";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const applicantEmail = "";
  const applicantPhone = "";
  useEffect(() => {
    axios
      .get("https://shipfinex.onrender.com/api/v1/kyc/websdk")
      .then((response) => {
        console.log("Access Token --->", response.data.token);
        setAccessToken(response.data.token);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {accessToken ? (
        <SumsubWebSdk
          style={{
            background: "#FFFFFF",
          }}
          accessToken={accessToken}
          expirationHandler={() => Promise.resolve(accessToken)}
          config={{
            lang: "ru-RU",
            email: applicantEmail,
            phone: applicantPhone,
            i18n: {
              document: {
                subTitles: {
                  IDENTITY: "Upload a document that proves your identity",
                },
              },
            },
            onMessage: (type: any, payload: any) => {
              console.log("WebSDK onMessage", type, payload);
            },
            uiConf: {
              customCssStr:
                ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}",
            },
            onError: (error: any) => {
              console.error("WebSDK onError", error);
            },
          }}
          options={{ addViewportTag: false, adaptIframeHeight: true }}
          onMessage={(type: any, payload: any) => {
            console.log("onMessage", type, payload);
          }}
          onError={(data: any) => console.log("onError", data)}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
