// import logo from "./logo.svg";
import "./App.css";

// import { Button } from "@chakra-ui/react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import ChatPage from "./Page/ChatPage";
// import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chats" element={<ChatPage />}></Route>
      </Routes>
    </div>
  );
}
export default App;

// {
//   /* // // <div className="App">
//     //   {/* <div className="App"> */
// }
// {
//   /* //   Hello Diksha's React app<br></br>
//     //   <Router>
//     //     <Routes> */
// }
// // {/* <Route path="/" component={HomePage} /> */}
// {
//   /* //       <Route path="/" element={<HomePage />} exact></Route>
//     //       <Route path="/chats" element={<ChatPage />}></Route> */
// }
// // {/* <Route path="/ChatPage" element={<ChatPage />}></Route> */}
// // {/* path to chats page */}
// {
//   /* //     </Routes>
//     //   </Router> */
// }
// // {/* <Route path="/" element={<HomePage />} /> */}
// {
//   /* // path to home page */
// }
// //{" "}
// {
//   /* <header className="App-header">
//     //   <img src={logo} className="App-logo" alt="logo" />
//     //   <p>
//     //     Edit <code>src/App.js</code> and save to reload.
//     //   </p>
//     //   <a
//     //     className="App-link"
//     //     href="https://reactjs.org"
//     //     target="_blank"
//     //     rel="noopener noreferrer"
//     //   >
//     //     Learn React
//     //   </a>
//     // </header> */
// }
// {
//   /* // </div> */
// }
// //{" "}
