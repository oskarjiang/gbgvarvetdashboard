import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Grid } from '@mui/material';
import { fetchRaceData } from '../services/raceService';
import { Runner } from '../types/race';
import RunnerCard from './RunnerCard';

const PARTICIPANT_IDS = [
    '9TG4PPOP277348',
    '9TG4PPOP277611',
    '9TG4PPOP277428',
    '9TG4PPOP27816F',
    '9TG4PPOP279145'
];

const Dashboard: React.FC = () => {
    const [runners, setRunners] = useState<Runner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetchRaceData(PARTICIPANT_IDS);
            setRunners(response.results);
            setError(null);
        } catch (err) {
            setError('Failed to fetch race data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Göteborgsvarvet 2025 Live Tracking
            </Typography>
            <Grid container spacing={3}>
                {runners.map((runner) => (
                    <Grid key={runner.idParticipant} xs={12} md={6}>
                        <RunnerCard runner={runner} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard; 