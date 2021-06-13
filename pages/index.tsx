import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export async function getServerSideProps(context) {

    return {
      redirect: {
        destination: '/FindCarpool',
        permanent: true,
      },
    }
}

export default function Home() {
  return <Navbar />;
}
