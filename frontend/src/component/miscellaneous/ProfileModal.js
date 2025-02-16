import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

// import { useDisclosure } from "@chakra-ui/hooks";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            diaplay="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            ></Image>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email:{user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="#99d98c" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  //   wrap menuitem-My profile in sideDrawer.js with profilemodal
};

export default ProfileModal;
