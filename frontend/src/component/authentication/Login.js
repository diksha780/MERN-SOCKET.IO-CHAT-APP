import React, { useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
// import { FormLabel } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
// import toast from chakra UI
import { useToast } from "@chakra-ui/react";

// import axios
import axios from "axios";

// import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

const Login = () => {
  // create usestates
  // const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  // add loading state
  const [loading, setLoading] = useState(false);
  // for toast
  const toast = useToast();
  // useNavigate hook
  // import useNavigate from react-router-dom
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    // check email and password are filled or not
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feild",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // otherwise we will API request to store this into our database
    // as we neend to send  data as application/json
    // so need to set headers for our request
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // when registration is succesful
      toast({
        title: "Login Successful",
        status: "Success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // now store all the data into database
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.pushState("/chats");
      navigate("/chats");
      // history is imported from  a hook called useHistory from react-router-dom
      // also import axios
    } catch (error) {
      // if an error occurs then display a toast
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      {/* form control for email starts */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* form control for email ends */}

      {/* form control for password starts */}
      <FormControl id="password" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* create a button to show/hide password */}
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
              {/* show is a state, so create its state */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* form control for password ends*/}

      {/* submit sign up buttom starts */}
      <Button
        // bg="#276749"
        bg="#48BB78"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        bg="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClickCapture={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        {" "}
        Get Guest User Credentials
      </Button>
      {/* submit sign up buttom ends */}
    </VStack>
  );
};
export default Login;
