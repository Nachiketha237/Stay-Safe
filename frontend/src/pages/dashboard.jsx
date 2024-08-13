import React from 'react';
import { Box, Heading, Text, Button, Stack, SimpleGrid, Icon, Flex, useBreakpointValue } from '@chakra-ui/react';
import { FaBookOpen, FaVolleyballBall, FaMapMarkerAlt, FaHandHoldingHeart, FaTools, FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box p={5} bgGradient="linear(to-br, #e0f7fa, #fff)" minHeight="100vh">
      <Heading mb={4} color="teal.700" textAlign="center">Disaster Management Dashboard</Heading>
      <Text mb={8} color="gray.700" textAlign="center">Welcome to the Disaster Management System. Use the options below to navigate through the application and access important features.</Text>

      {/* Quick Actions */}
      <SimpleGrid columns={gridColumns} spacing={10} mb={10}>
        <Box p={5} borderWidth={1} borderRadius="md" textAlign="center" bg="white" boxShadow="lg" transition="all 0.3s" _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}>
          <Icon as={FaBullhorn} boxSize={12} color="teal.500" mb={3} />
          <Heading size="md" mb={2}>Announcements</Heading>
          <Text mt={2} color="gray.600">Stay updated with important announcements related to disaster management and community updates.</Text>
          <Link to="/announcement">
            <Button mt={4} colorScheme="teal" size="lg">View Announcements</Button>
          </Link>
        </Box>
        
        <Box p={5} borderWidth={1} borderRadius="md" textAlign="center" bg="white" boxShadow="lg" transition="all 0.3s" _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}>
          <Icon as={FaBookOpen} boxSize={12} color="purple.500" mb={3} />
          <Heading size="md" mb={2}>Blogs</Heading>
          <Text mt={2} color="gray.600">Read informative articles and blog posts about disaster preparedness, response, and recovery.</Text>
          <Link to="/blogs">
            <Button mt={4} colorScheme="purple" size="lg">Read Blogs</Button>
          </Link>
        </Box>
        
        <Box p={5} borderWidth={1} borderRadius="md" textAlign="center" bg="white" boxShadow="lg" transition="all 0.3s" _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}>
          <Icon as={FaVolleyballBall} boxSize={12} color="orange.500" mb={3} />
          <Heading size="md" mb={2}>Volunteers</Heading>
          <Text mt={2} color="gray.600">Find and connect with volunteers to support disaster response efforts and community help.</Text>
          <Link to="/volunteer">
            <Button mt={4} colorScheme="orange" size="lg">Volunteer Opportunities</Button>
          </Link>
        </Box>
      </SimpleGrid>
      
      {/* Additional Information with Tips */}
      <Box mt={10} bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={4}>Emergency Preparedness Tips</Heading>
        <Stack spacing={4}>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: 'md' }} transition="all 0.3s">
              <Text><strong>1. Create an Emergency Kit:</strong> Prepare a kit with essential supplies including food, water, medications, and important documents.</Text>
            </Box>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: 'md' }} transition="all 0.3s">
              <Text><strong>2. Develop a Family Emergency Plan:</strong> Establish communication plans and meet-up locations for your family during a disaster.</Text>
            </Box>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: 'md' }} transition="all 0.3s">
              <Text><strong>3. Stay Informed:</strong> Follow local news and weather updates to stay aware of any impending disasters or emergencies.</Text>
            </Box>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: 'md' }} transition="all 0.3s">
              <Text><strong>4. Secure Your Home:</strong> Ensure that your home is fortified against potential hazards such as floods, earthquakes, and severe storms.</Text>
            </Box>
            <Box p={5} borderWidth={1} borderRadius="md" boxShadow="sm" _hover={{ boxShadow: 'md' }} transition="all 0.3s">
              <Text><strong>5. Prepare Your Vehicle:</strong> Keep your vehicle in good working condition with an emergency kit and fuel reserve.</Text>
            </Box>
        </Stack>
      </Box>

      {/* Statistics Section */}
      <Box mt={10} bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={4}>Key Statistics</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Box p={5} borderWidth={1} borderRadius="md" bg="teal.100" textAlign="center">
            <Heading size="lg" color="teal.700">200k+</Heading>
            <Text mt={2} color="gray.600">Users</Text>
          </Box>
          <Box p={5} borderWidth={1} borderRadius="md" bg="purple.100" textAlign="center">
            <Heading size="lg" color="purple.700">150+</Heading>
            <Text mt={2} color="gray.600">Published Blogs</Text>
          </Box>
          <Box p={5} borderWidth={1} borderRadius="md" bg="orange.100" textAlign="center">
            <Heading size="lg" color="orange.700">50+</Heading>
            <Text mt={2} color="gray.600">Volunteers</Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Footer Section */}
      <Box mt={10} bg="teal.700" color="white" p={6} borderRadius="md" textAlign="center">
        <Heading size="md" mb={3}>Need Help?</Heading>
        <Text mb={4}>For assistance or more information about disaster management, please contact our support team.</Text>
        <Link to="/help">
          <Button colorScheme="teal">Contact Support</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Dashboard;
