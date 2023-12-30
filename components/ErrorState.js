import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function ErrorState({ description, title }) {
  return (
    <Flex justifyContent="center">
      <VStack
        position="fixed"
        top="50%"
        transform="translateY(-50%)"
        spacing={8}
      >
        <Box border="2px" borderColor="#FF9600" borderRadius="full" p={1}>
          <Flex
            align="center"
            borderRadius="full"
            color="white"
            fontSize="6xl"
            height={28}
            justify="center"
            width={28}
          >
            <WarningIcon zIndex={-57656} w={28} h={28} color="red.500" />
          </Flex>
        </Box>
        <Box textAlign="center" maxWidth="800px">
          <Heading fontSize="3xl" pb={2}>
            {title}
          </Heading>
          {description ? (
            <Text fontSize="lg" color="gray.600">
              {description}
            </Text>
          ) : null}
        </Box>
      </VStack>
    </Flex>
  );
}
