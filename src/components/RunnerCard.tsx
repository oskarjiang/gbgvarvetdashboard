import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
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
        <Card 
            elevation={1}
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 4px 8px rgba(9, 30, 66, 0.25)',
                    borderColor: 'primary.main',
                }
            }}
        >
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: 'url(/bg-pattern.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                        pointerEvents: 'none'
                    }
                }}
            >
                <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                        fontWeight: 600,
                        mb: 1,
                        letterSpacing: '-0.01em'
                    }}
                >
                    {runner.displayName}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        mb: 1,
                        opacity: 0.9,
                        fontWeight: 500
                    }}
                >
                    Start: {new Date(runner.startDateTime).toLocaleTimeString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                        label={`#${runner.startNo}`} 
                        size="small" 
                        color="primary" 
                        variant="filled"
                        sx={{ 
                            fontWeight: 500,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                            }
                        }}
                    />
                    <Chip 
                        label={runner.startGroup} 
                        size="small" 
                        color="secondary" 
                        variant="filled"
                        sx={{ 
                            fontWeight: 500,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                            }
                        }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Box sx={{ width: '100%', mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Progress
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {progress.toFixed(1)}%
                                </Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={progress} 
                                sx={{ 
                                    height: 8, 
                                    borderRadius: 1,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 1,
                                        bgcolor: 'primary.main'
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                mb: 1,
                                fontWeight: 500,
                                color: 'text.primary',
                                letterSpacing: '-0.01em'
                            }}
                        >
                            Split Times
                        </Typography>
                        <TableContainer 
                            component={Paper} 
                            elevation={0}
                            sx={{ 
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 500, bgcolor: 'action.hover' }}>Split</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 500, bgcolor: 'action.hover' }}>Distance</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 500, bgcolor: 'action.hover' }}>Time</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 500, bgcolor: 'action.hover' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {runner.splits.map((split) => (
                                        <TableRow 
                                            key={split.key}
                                            sx={{ 
                                                bgcolor: split.time > 0 ? 'action.selected' : 'inherit',
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                '&:hover': {
                                                    bgcolor: 'action.hover'
                                                }
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {split.name}
                                            </TableCell>
                                            <TableCell align="right">{split.km.toFixed(2)} km</TableCell>
                                            <TableCell align="right">{formatTime(split.time)}</TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    label={split.time > 0 ? 'Completed' : 'Pending'} 
                                                    size="small"
                                                    color={split.time > 0 ? 'success' : 'default'}
                                                    variant={split.time > 0 ? 'filled' : 'outlined'}
                                                    sx={{ 
                                                        fontWeight: 500,
                                                        minWidth: 80,
                                                        borderRadius: 1
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RunnerCard; 