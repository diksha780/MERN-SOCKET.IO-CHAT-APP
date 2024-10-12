// 1. ******create context api starts
import {
  createContext,
  useContext,
  useState,
  useEffect,
  children,
} from "react";
// 9.import history
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

// 2.create chatProvider which will wrap whole of our app
const ChatProvider = ({ children }) => {
  // // 9.make instance of  history
  const navigate = useNavigate();

  // 6. create hook usestate and  send them to our our tha is <ChatContext.Provider
  // value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
  // >
  const [user, setUser] = useState();

  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  // 7. as we store the login and signup info ofuser into local storage, we will get it in stringy format
  useEffect(() => {
    // fetch the local storage
    // as it is in stringified data, we'll parse it
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // store userInfo into setUser
    setUser(userInfo);
    // 8. if the user is not logged in then he is redirected to login page ie "/" route

    if (!userInfo) {
      // import history above
      navigate("/");
    }
  }, [navigate]);
  return (
    // 7.to make useState accessible from whole app, provide it in ChatProvider
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//  ******create context api ends

// 5.********* to make conetxt api accessible from other parts of our app, we use hook
// our all states are inside ChatState variable
export const ChatState = () => {
  return useContext(ChatContext);
};
// 3. export it
export default ChatProvider;
// 4. go to index.js,, replace <strictMode> with ChatProvider
