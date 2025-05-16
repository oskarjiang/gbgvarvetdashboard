import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Grid, Paper } from '@mui/material';
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
            setLoading(true);
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
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ 
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 4
        }}>
            <Container maxWidth="xl">
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 4, 
                        mb: 4, 
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 2
                    }}
                >
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom 
                        align="center" 
                        sx={{ 
                            fontWeight: 'medium',
                            mb: 1
                        }}
                    >
                        Göteborgsvarvet 2025
                    </Typography>
                    <Typography 
                        variant="h5" 
                        align="center" 
                        sx={{ 
                            opacity: 0.9,
                            fontWeight: 'regular'
                        }}
                    >
                        Live Runner Tracking
                    </Typography>
                </Paper>

                {error && (
                    <Paper 
                        sx={{ 
                            p: 2, 
                            mb: 3, 
                            bgcolor: 'error.light',
                            color: 'error.contrastText'
                        }}
                    >
                        <Typography>{error}</Typography>
                    </Paper>
                )}

                {loading && runners.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {runners.map((runner) => (
                            <Grid key={runner.idParticipant} xs={12} md={6} lg={4}>
                                <RunnerCard runner={runner} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard; 