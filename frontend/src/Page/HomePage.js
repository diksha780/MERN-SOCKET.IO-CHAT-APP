import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../component/authentication/Login";
import SignUp from "../component/authentication/SignUp";
// import { useHistory } from "react-router-dom"; //error
// instead use useNavigate
import { useNavigate } from "react-router-dom";
function HomePage() {
  // ...1. if the user is logged in, push him back to the chats page
  const navigate = useNavigate();

  useEffect(() => {
    // fetch the local storage
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // if user is there , then push him to /chats page
    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" color="green">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
