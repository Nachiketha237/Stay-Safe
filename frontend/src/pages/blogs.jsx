import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Link,
  useBreakpointValue,
  Button,
  Input,
  Textarea,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', url: '', date: '' });
  const [editingBlog, setEditingBlog] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs/', {
        contentType: 'application/json',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      console.log(response.data); // Verify the data
      if (response.data && Array.isArray(response.data.results)) {
        setBlogs(response.data.results);
      } else {
        console.error('Expected an array of blogs');
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post('/blogs/', formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      fetchBlogs();
      setFormData({ title: '', content: '', url: '', date: '' });
      onClose(); // Close the modal after creating the blog
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box p={5} bgGradient="linear(to-br, #e3f2fd, #ffffff)" minHeight="100vh">
      <Heading mb={8} color="blue.800" textAlign="center" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        Latest Blogs
      </Heading>
      <Text mb={8} color="gray.700" textAlign="center" fontSize={{ base: 'md', md: 'lg' }}>
        Stay informed with our latest articles on disaster preparedness and safety.
      </Text>

      <Button mb={8} colorScheme="teal" onClick={onOpen}>
        Create Blog
      </Button>

      <SimpleGrid columns={gridColumns} spacing={10}>
        {Array.isArray(blogs) && blogs.map((blog) => (
          <Box
            key={blog.id}
            p={6}
            borderRadius="lg"
            bg="white"
            boxShadow="lg"
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          >
            <VStack spacing={3} align="start">
              <Text fontSize="sm" color="gray.500">{blog.date}</Text>
              <Heading size="md" color="blue.700">{blog.title}</Heading>
              <Text color="gray.600">{blog.content}</Text>
              <Link href={blog.url} color="teal.500" fontWeight="bold" isExternal>Read more</Link>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal for Creating Blog */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
              <Textarea placeholder="Content" name="content" value={formData.content} onChange={handleChange} />
              <Input placeholder="URL" name="url" value={formData.url} onChange={handleChange} />
              <Input placeholder="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCreate}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Blogs;
