import React from 'react';
import { Box, Heading, Text, VStack, HStack, Input, Button, Flex, Spacer, Avatar } from '@chakra-ui/react';

const HelpCenter = () => {
    return (
        <Box p={5} bg="gray.50" minHeight="100vh">
            <Heading mb={4} color="teal.600" textAlign="center" fontSize="3xl">Help Center</Heading>
            <Text mb={8} color="gray.600" textAlign="center">
                Our support team is here to assist you. Type your message below.
            </Text>

            <Box bg="white" p={6} borderRadius="md" boxShadow="xl" maxWidth="600px" mx="auto">
                <VStack spacing={4} align="stretch">
                    {/* Dummy Chat Messages */}
                    <Flex align="center">
                        <Avatar name="User" src="https://bit.ly/broken-link" size="sm" mr={3} />
                        <Box bg="teal.100" p={4} borderRadius="lg" position="relative">
                            <Text><strong>User:</strong> Hello, I need help with evacuation.</Text>
                            <Text fontSize="xs" color="gray.500" mt={1} position="absolute" right={2} bottom={1}>10:00 AM</Text>
                        </Box>
                    </Flex>
                    
                    <Flex align="center" justify="flex-end">
                        <Box bg="gray.100" p={4} borderRadius="lg" position="relative">
                            <Text><strong>Admin:</strong> We're here to help! Please stay calm, we're locating the nearest shelter for you.</Text>
                            <Text fontSize="xs" color="gray.500" mt={1} position="absolute" right={2} bottom={1}>10:02 AM</Text>
                        </Box>
                        <Avatar name="Admin" src="https://bit.ly/broken-link" size="sm" ml={3} />
                    </Flex>
                    {/* End of Dummy Messages */}

                    {/* Input for New Messages */}
                    <HStack spacing={2} pt={4}>
                        <Input
                            placeholder="Type your message here..."
                            bg="gray.100"
                            borderRadius="full"
                            flex="1"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                        />
                        <Button colorScheme="teal" borderRadius="full" px={6}>Send</Button>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default HelpCenter;
