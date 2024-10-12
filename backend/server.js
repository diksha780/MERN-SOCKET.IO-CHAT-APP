const express = require("express"); //import express

const dotenv = require("dotenv"); //import library dotenv which we intalled(npm i dotenv)

const { chats } = require("./data/data"); // import dummy chats from data.js file in data folder
// set connection to mongoDb through mongoose
const connectDB = require("./config/db");
// import router from userRoutes.js
const userRoutes = require("./routes/userRoutes");
// import router from chatRoutes.js
const chatRoutes = require("./routes/chatRoutes");
// import error handling middlewares from errorMiddleawre.js
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); //use of PORT variable
connectDB(); //must below the dotenv.config() //to connect to mongoDB database
const app = express(); // create instance of express
const colors = require("colors"); // import colors package

// routes to send and fetch chay
const messageRoutes = require("./routes/messageRoutes");
// ..1 : we have to tell the server to accept the json data
app.use(express.json());
/*create an API  with Express JS starts  */
app.get("/", (req, res) => {
  res.send("API is Running Successfully");
}); // make GET request to slash route
// go to port 5000 to check if this api is working
/*create an API ends  */

// ********end point for user start
app.use("/api/user", userRoutes);
//extract all the logics regarding users in this userRoutes file

// ********end point for user ends

// ****create APIs for chat creation
app.use("/api/chats", chatRoutes);
// inside routes, make file chatRoutes.js

// ***********one on on message
app.use("/api/message", messageRoutes);

// ******If user enters wrong Route starts

// add two error handling millwares
// if any of the above url or routes doesnot exist or are wrong, then this all following error
app.use(notFound);
app.use(errorHandler);

// ******If user enters wrong Route starts

/* start your server starts*/

const PORT = process.env.PORT || 5000; // use the variable PORT from .env file , or if not available use 5000

const server = app.listen(
  PORT,
  console.log(`Server Started on PORT ${PORT} `.yellow.bold)
);
// now run this server by commands in terminal $ node backend/server.js

const io = require("socket.io")(server, {
  pingTimeout: 60000, //amount of time it willl wait while being inactive
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

//create a connection
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  // user can connect to its own personal soxket.io server

  //here , we are creating a new socket where data from frontend will come and join a new socket
  socket.on("setup", (userData) => {
    //create room for a particular user with its user id
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    //create a room with the id of room
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  //create a new socket for typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));

  //create a new socket for stop typing
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chats = newMessageRecieved.chats;
    if (!chats.users) return console.log("chats.users not defined");

    // in a gorup chat room , the message that i sent, will be displayed to all  the othe users of the chat , except me
    chats.users.forEach((user) => {
      //if its me, dont sen dthat message to me
      if (user._id == newMessageRecieved.sender._id) return;
      // if other users, then send them that message
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

/* start your server ends*/
