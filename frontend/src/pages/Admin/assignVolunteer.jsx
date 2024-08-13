import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Select, FormControl, FormLabel, Textarea, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function AssignVolunteer() {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState('');
    const [assignmentDetails, setAssignmentDetails] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/volunteers/')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setVolunteers(response.data);
                    setFilteredVolunteers(response.data); // Initialize with all volunteers
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the volunteers!', error);
            });
    }, []);

    const handleCityChange = (e) => {
        setCity(e.target.value);
        filterVolunteersByCity(e.target.value);
    };

    const filterVolunteersByCity = (city) => {
        if (city === '') {
            setFilteredVolunteers(volunteers); // Show all if no city is selected
        } else {
            const filtered = volunteers.filter(volunteer => volunteer.city === city);
            setFilteredVolunteers(filtered);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/assignments/', { volunteer_id: selectedVolunteer, details: assignmentDetails })
            .then(() => {
                navigate('/admin/volunteers');
            })
            .catch(error => {
                console.error('There was an error assigning the volunteer!', error);
            });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                    <FormLabel>City of Help Requester</FormLabel>
                    <Input value={city} onChange={handleCityChange} placeholder="Enter city" required />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Select Volunteer</FormLabel>
                    <Select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)} required>
                        <option value="">Select a volunteer</option>
                        {Array.isArray(filteredVolunteers) && filteredVolunteers.map(volunteer => (
                            <option key={volunteer.id} value={volunteer.id}>{volunteer.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Assignment Details</FormLabel>
                    <Textarea value={assignmentDetails} onChange={(e) => setAssignmentDetails(e.target.value)} required />
                </FormControl>
                <Button colorScheme="teal" type="submit">Assign Volunteer</Button>
            </form>
        </Box>
    );
}

export default AssignVolunteer;
