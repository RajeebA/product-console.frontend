import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack
} from "@chakra-ui/react";
import { useHistory } from "react-router";

const SidebarContent = ({ onClick, current }) => (
  <VStack>
    <Button
      colorScheme={current === "/product" ? "blue" : ""}
      onClick={() => onClick("product")}
      w="100%"
    >
      Product
    </Button>
    <Button
      colorScheme={current === "/category" ? "blue" : ""}
      onClick={() => onClick("category")}
      w="100%"
    >
      Category
    </Button>
    <Button
      colorScheme={current === "/list" ? "blue" : ""}
      onClick={() => onClick("list")}
      w="100%"
    >
      ProductList
    </Button>
  </VStack>
);

const Sidebar = ({ isOpen, variant, onClose }) => {
  const history = useHistory();
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#dfdfdf"
    >
      <SidebarContent
        current={history?.location?.pathname}
        onClick={(path) => {
          history.push(path);
        }}
      />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
