import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { MainContent } from "./components/MyContent";
import SignInButton from "./components/SignInButton";
import "./App.css";

export default function App({msalInstance}) {
    return (
        <MsalProvider instance={msalInstance}>
          <SignInButton>
            <MainContent />
          </SignInButton>
        </MsalProvider>
    );
}