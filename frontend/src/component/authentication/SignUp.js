import React, { useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  position,
} from "@chakra-ui/react";
// import React from "react";
// import { FormControl } from "@chakra-ui/react";
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

const SignUp = () => {
  // create usestates
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  // state for loading
  const [loading, setLoading] = useState(false);
  // import useToast() from chakraUI toast
  const toast = useToast();
  // useNavigate hook
  // import useNavigate from react-router-dom
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);

  // function to upload the picture
  const postDetails = (pics) => {
    setLoading(true);
    // check if the pic is the undefined, pop up an error using toast from chakraUI
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        //  description: "We've created your account for you.",
        status: "warning",
        duration: 5000, //how lonf this appears on screen
        isClosable: true,
        position: "bottom",
      });
      return; //means move forward if pic is undefined
    }
    // check if it is image or not
    // if not jpeg or png
    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      toast({
        title: "Please Select a JPEG or PNG Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // if jpeg or png
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // create a new form data
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "diksha780");
      // make API call to that URL
      fetch("https://api.cloudinary.com/v1_1/diksha780/image/upload", {
        // set some configuration
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data.url.toString());
          setLoading(false); //because our pic is succesfully uploaded
        })
        // if any error occurs
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      // convert the data in json format and then
      // set pic  state by using jsonn data
    }
    // if pic uploaded is not in jpeg or png , then throw error
    else {
      toast({
        title: "Please Select an Image!",
        //  description: "We've created your account for you.",
        status: "warning",
        duration: 5000, //how lonf this appears on screen
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  //run submitHandler () on submit button
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feild",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // check if pasword === confirmPassword
    if (password !== confirmpassword) {
      toast({
        title: "Password Do not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      // when registration is succesful
      toast({
        title: "Registration Successful",
        status: "Success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
      {/* form control for name starts */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      {/* form control for name ends */}

      {/* form control for email starts */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
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

      {/* form control for confirm password starts */}
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password </FormLabel>
        <InputGroup size="md">
          <Input
            type={show1 ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          {/* create a button to show/hide password */}
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick1}>
              {show1 ? "Hide" : "show"}
              {/* show is a state, so create its state */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* form control for confirm password ends*/}

      {/* form control for picture starts */}
      <FormControl id="pic" isRequired>
        <FormLabel>Upload your Picture</FormLabel>

        <Input
          type="file"
          p={1.5}
          accept="image/*" //accept only images
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      {/* form control for picture ends*/}
      {/* submit sign up buttom starts */}
      <Button
        // bg="#276749"
        bg="#48BB78"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // add loading state to the button
        isLoading={loading}
      >
        Sign Up
      </Button>
      {/* submit sign up buttom ends */}
    </VStack>
  );
};

export default SignUp;
