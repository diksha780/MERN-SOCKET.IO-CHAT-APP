import React, { StrictMode } from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react"; //import chakra provider
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   BrowserRouter,
// } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
// we have rendered everything that was in root div , inside index.html file in public folder
root.render(
  // we warp our whole app in chatProvider so that what ever states in made inside our context api, it can be accessible to whole of our app
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// wrap Chakra provider with ChatProvider

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
