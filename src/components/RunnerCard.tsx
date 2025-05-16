import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Grid } from '@mui/material';
import { Runner } from '../types/race';

interface RunnerCardProps {
    runner: Runner;
}

const formatTime = (time: number): string => {
    if (time === 0) return '-';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const RunnerCard: React.FC<RunnerCardProps> = ({ runner }) => {
    const getLatestSplit = () => {
        const completedSplits = runner.splits.filter(split => split.time > 0);
        return completedSplits.length > 0 ? completedSplits[completedSplits.length - 1] : null;
    };

    const latestSplit = getLatestSplit();
    const progress = latestSplit ? (latestSplit.km / 21.097) * 100 : 0;

    return (
        <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Typography variant="h5" component="div">
                            {runner.displayName}
                        </Typography>
                        <Typography color="text.secondary">
                            Start Number: {runner.startNo} | Group: {runner.startGroup}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Box sx={{ width: '100%', mb: 1 }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={progress} 
                                sx={{ height: 10, borderRadius: 5 }}
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Progress: {progress.toFixed(1)}%
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="h6">Latest Split</Typography>
                        {latestSplit ? (
                            <>
                                <Typography variant="body1">
                                    {latestSplit.name}: {formatTime(latestSplit.time)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {latestSplit.km.toFixed(2)} km
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1">Not started</Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RunnerCard; 