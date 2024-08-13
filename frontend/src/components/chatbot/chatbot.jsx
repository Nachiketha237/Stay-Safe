import React, { useState } from 'react';
import {
    Box, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader,
    DrawerOverlay, DrawerContent, DrawerCloseButton, VStack,
    HStack, Input, Flex, Avatar, Text
} from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatDrawer = ({ isOpen, onOpen, onClose }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [responses, setResponses] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            content: message,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://127.0.0.1:8000/ai/query/', 
                { content: message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );

            const newResponse = {
                id: Date.now(),
                content: response.data.response,
                sender: 'admin',
                timestamp: new Date(),
            };

            setResponses([...responses, newResponse]);
            setMessage("");

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Combine and sort messages and responses by timestamp
    const combinedMessages = [...messages, ...responses].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <>
            <Button colorScheme="teal" onClick={onOpen} position="fixed" bottom={5} right={5} borderRadius="full" size="lg">
                <FaRobot size={32} />
            </Button>

            <Drawer isOpen={isOpen} onClose={onClose} size="sm">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Help Center Chat</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={4} align="stretch" height="full" overflowY="auto">
                            {combinedMessages.map((msg) => (
                                <Flex
                                    key={msg.id}
                                    align="center"
                                    justify={msg.sender === 'user' ? 'flex-start' : 'flex-end'}
                                >
                                    {msg.sender === 'user' ? (
                                        <>
                                            <Avatar name="User" src="https://bit.ly/broken-link" size="sm" mr={3} />
                                            <Box
                                                bg="teal.100"
                                                p={4}
                                                borderRadius="lg"
                                                position="relative"
                                                maxWidth="70%"
                                            >
                                                <Text>
                                                    <strong>User:</strong> {msg.content}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500" mt={1} position="absolute" right={2} bottom={1}>
                                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                                </Text>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Box
                                                bg="gray.100"
                                                p={4}
                                                borderRadius="lg"
                                                position="relative"
                                                maxWidth="70%"
                                            >
                                                <Text>
                                                    <strong>Admin:</strong> <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                </Text>
                                                <Text fontSize="xs" color="gray.500" mt={1} position="absolute" right={2} bottom={1}>
                                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                                </Text>
                                            </Box>
                                            <Avatar name="Admin" src="https://bit.ly/broken-link" size="sm" ml={3} />
                                        </>
                                    )}
                                </Flex>
                            ))}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <HStack spacing={2} width="full">
                            <Input
                                placeholder="Type your message here..."
                                bg="gray.100"
                                borderRadius="full"
                                flex="1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                _focus={{ bg: "white", boxShadow: "outline" }}
                            />
                            <Button colorScheme="teal" borderRadius="full" onClick={handleSendMessage}>
                                Send
                            </Button>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ChatDrawer;
