import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useRegister from '../../hooks/useRegister'; // Update with the correct path to your hook

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { register, loading, error } = useRegister(); // Include error handling

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (registerData.password !== registerData.passwordConfirmation) {
            toast({
                title: "Passwords do not match.",
                description: "Please ensure both passwords match.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            await register(registerData);
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration error:", error);
            toast({
                title: "Registration failed.",
                description: "Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    if (loading) {
        return (<p>Loading...</p>);
    }

    return (
        <Box p={5} bg="gray.50" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <Box bg="white" p={8} borderRadius="md" boxShadow="md" maxWidth="400px" width="100%">
                <Heading mb={6} color="teal.700" textAlign="center">Register</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Input
                            name="username"
                            placeholder="Name"
                            type="text"
                            value={registerData.username}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={registerData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={registerData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            type="password"
                            value={registerData.passwordConfirmation}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" colorScheme="teal" width="full">Register</Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account? <a href="/login" style={{ color: 'teal.500' }}>Login</a>
                </Text>
            </Box>
        </Box>
    );
};

export default Register;
