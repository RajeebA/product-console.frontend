import { Box, Center, IconButton, Text, Flex } from "@chakra-ui/react";

const Header = ({ showSidebarButton = true, onShowSidebar, title }) => {
  return (
    <Flex bg="tomato" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">{title}</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
};

export default Header;
