import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
// 1. import ChatState
import { ChatState } from "../Context/ChatProvider";
// import SideDrawer component
import SideDrawer from "../component/miscellaneous/SideDrawer";
import MyChats from "../component/MyChats";

import Chatbox from "../component/ChatBox";

// import axios from "axios";
// to fetch api to take chats from backend to dispaly on frotend, we neend to install package axios
// npm i
// import axios package

const ChatPage = () => {
  //2. take useState from context api
  // inside ChatState, we have userState
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  // useState to store data
  // ******** I am commenting this part of code, as now at the time of buildig chatpages, i dont need this code anymore
  // start commenting
  // const [chats, setChats] = useState([]);

  // function to fetch chats from backend
  // const fetchChats = async () => {
  // in order to use await keywird, we need async() function
  // const { data } = await axios.get(
  // "/api/chats"
  // ); /*make get request to fetch data from endpoint chats dmmy data api : /api/chats */
  // setChats(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  // end commenting
  return (
    <div style={{ width: "100%" }}>
      {/* 3. if user id there, create sidedrawer */}
      {user && <SideDrawer />}

      {/* 4. create side page starts  */}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {/* MyChats is the left most side, chat wala box */}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {/* chatBox is the right most chat wala box */}
      </Box>

      {/* 4. create side page ends */}

      {/* ************start commenting */}
      {/* {chats.map((chats) => (
        <div key={chats._id}>{chats.chatName}</div>
      ))} */}
      {/* end commenting */}
    </div>
  );
  // <div>{chats.map()}</div>;

  // return {chats.map()};
};

export default ChatPage;
