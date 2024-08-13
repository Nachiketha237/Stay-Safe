import React, { useState, useRef } from 'react';
import { Box, Heading, Text, Stack, Button, SimpleGrid, FormControl, FormLabel, Input, Select, Checkbox, useToast, Icon } from '@chakra-ui/react';
import { FaHandsHelping, FaUserShield, FaFirstAid, FaLifeRing } from 'react-icons/fa';
import api from '../services/api'; // Adjust the import path as necessary

const dummyOpportunities = [
  {
    id: 1,
    title: 'Disaster Relief Volunteer',
    description: 'Assist in relief operations, including distribution of supplies and providing support to affected communities.',
    icon: FaHandsHelping,
    type: 'Search and Rescue'
  },
  {
    id: 2,
    title: 'Medical Support Volunteer',
    description: 'Provide medical assistance and support to those affected by disasters.',
    icon: FaFirstAid,
    type: 'Medical'
  },
  {
    id: 3,
    title: 'Shelter Coordinator',
    description: 'Help manage and coordinate shelters for displaced individuals and families.',
    icon: FaUserShield,
    type: 'Shelter'
  },
  {
    id: 4,
    title: 'Community Outreach Volunteer',
    description: 'Engage with the community to raise awareness and provide assistance.',
    icon: FaLifeRing,
    type: 'Other'
  }
];

const Volunteer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', type: '', availability: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const registrationFormRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting the form:', formData);
      await api.post(`/volunteer/`, formData,
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } }
      ); // Adjust the endpoint as necessary
      toast({
        title: 'Registration Successful',
        description: 'Thank you for registering. We will get in touch with you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: '', email: '', phone: '', city: '', type: '', availability: true });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'An error occurred while registering. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    registrationFormRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box p={5} bgGradient="linear(to-br, #f7fbff, #fff)" minHeight="100vh">
      <Heading mb={6} textAlign="center">Join Our Volunteer Community</Heading>
      <Text mb={6} color="gray.700" textAlign="center">We’re always looking for dedicated volunteers to assist in various disaster response efforts.</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {dummyOpportunities.map((opportunity) => (
          <Box
            key={opportunity.id}
            p={5}
            borderWidth={1}
            borderRadius="md"
            bg="white"
            boxShadow="lg"
            _hover={{ boxShadow: '2xl' }}
            transition="all 0.3s"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Icon as={opportunity.icon} w={10} h={10} color="teal.500" mb={3} />
            <Heading size="md" mb={3}>{opportunity.title}</Heading>
            <Text mb={3}>{opportunity.description}</Text>
            <Button colorScheme="teal" mt={4} onClick={scrollToForm}>Apply Now</Button>
          </Box>
        ))}
      </SimpleGrid>

      <Box mt={10} bg="white" p={6} borderRadius="md" boxShadow="md" ref={registrationFormRef}>
        <Heading size="lg" mb={4}>Register to Volunteer</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </FormControl>
            <FormControl id="city" isRequired>
              <FormLabel>City</FormLabel>
              <Input type="text" name="city" value={formData.city} onChange={handleChange} />
            </FormControl>
            <FormControl id="type" isRequired>
              <FormLabel>Type of Volunteer Work</FormLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select a type</option>
                <option value="Medical">Medical</option>
                <option value="Shelter">Shelter</option>
                <option value="Search and Rescue">Search and Rescue</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl id="availability">
              <Checkbox name="availability" isChecked={formData.availability} onChange={handleChange}>
                Available
              </Checkbox>
            </FormControl>
            <Button colorScheme="teal" type="submit" isLoading={isSubmitting} loadingText="Submitting">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Volunteer;
