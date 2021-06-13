import { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// const Links = ['Profile', 'Projects', 'Team'];

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export async function getServerSideProps(context) {

    return {
      redirect: {
        destination: '/FindCarpool',
        permanent: true,
      },
    }
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="column" spacing={4} align="center" mt="50%">
      <Button colorScheme="orange" variant="solid">
        Find Carpools
      </Button>
      <Button colorScheme="orange" variant="solid">
        Add Carpool
      </Button>
      <Button colorScheme="orange" variant="solid" width="20vh">
        Profile
      </Button>
     
    </Stack>
  );
}