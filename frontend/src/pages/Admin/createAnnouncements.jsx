import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

function CreateAnnouncement({ history }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/announcements/', { title, content, scheduled_at: scheduledAt })
            .then(() => {
                history.push('/admin/announcements');
            })
            .catch(error => {
                console.error('There was an error creating the announcement!', error);
            });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Content</FormLabel>
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Scheduled At (optional)</FormLabel>
                    <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
                </FormControl>
                <Button colorScheme="teal" type="submit">Create Announcement</Button>
            </form>
        </Box>
    );
}

export default CreateAnnouncement;
