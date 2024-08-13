import React from 'react';
import { Box, Heading, Text, Stack, SimpleGrid, Button, Icon } from '@chakra-ui/react';
import { FaBullhorn, FaExclamationTriangle, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const dummyAnnouncements = [
  {
    id: 1,
    title: 'Emergency Alert System Update',
    date: '2024-08-01',
    content: 'Our emergency alert system has been updated to provide more accurate and timely information during disasters. Please check your notification settings to ensure you receive the latest alerts.',
    icon: FaBullhorn
  },
  {
    id: 2,
    title: 'New Safety Guidelines Released',
    date: '2024-07-15',
    content: 'New safety guidelines have been released for various types of natural disasters. Review these guidelines to stay safe and prepared.',
    icon: FaExclamationTriangle
  },
  {
    id: 3,
    title: 'Upcoming Disaster Preparedness Workshop',
    date: '2024-08-20',
    content: 'Join us for a workshop on disaster preparedness to learn essential skills and strategies.',
    icon: FaCalendarAlt
  },
  {
    id: 4,
    title: 'Volunteer Appreciation Event',
    date: '2024-09-05',
    content: 'We are hosting an appreciation event for our dedicated volunteers. Thank you for your support and commitment!',
    icon: FaInfoCircle
  }
];

const Announcements = () => {
  return (
    <Box p={5} bg="gray.100" minHeight="100vh">
      <Heading mb={6} color="purple.800" textAlign="center">Important Announcements</Heading>
      <Text mb={6} color="gray.600" textAlign="center">Stay informed with our latest announcements and updates.</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {dummyAnnouncements.map((announcement) => (
          <Box
            key={announcement.id}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            _hover={{ boxShadow: 'lg' }}
            transition="all 0.3s"
          >
            <Icon as={announcement.icon} w={10} h={10} color="blue.500" mb={3} />
            <Heading size="md" mb={3}>{announcement.title}</Heading>
            <Text color="gray.500" mb={3}>{announcement.date}</Text>
            <Text mb={4}>{announcement.content}</Text>
            <Button colorScheme="blue">Learn More</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Announcements;
