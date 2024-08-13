import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';

function DisasterInsights() {
    const [predictions, setPredictions] = useState({});

    useEffect(() => {
        axios.get('/api/disaster/insights/')
            .then(response => {
                setPredictions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the disaster insights!', error);
            });
    }, []);

    return (
        <Box>
            <Text fontSize="2xl" mb="4">AI-Driven Disaster Insights</Text>
            <Text><strong>Disaster Type:</strong> {predictions.disaster_type}</Text>
            <Text><strong>Predicted Intensity:</strong> {predictions.predicted_intensity}</Text>
            <Text><strong>Predicted Impact Zones:</strong> {predictions.predicted_impact_zones && predictions.predicted_impact_zones.join(', ')}</Text>
        </Box>
    );
}

export default DisasterInsights;
