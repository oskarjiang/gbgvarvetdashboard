import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Divider } from '@mui/material';
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
            elevation={2}
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
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
                }}
            >
                <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{ 
                        fontWeight: 'medium',
                        mb: 1,
                    }}
                >
                    {runner.displayName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                        label={`#${runner.startNo}`} 
                        size="small" 
                        color="primary" 
                        variant="filled"
                        sx={{ 
                            fontWeight: 'medium',
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
                            fontWeight: 'medium',
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
                                    height: 10, 
                                    borderRadius: 5,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 5,
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
                                fontWeight: 'medium',
                                color: 'text.primary'
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
                                        <TableCell sx={{ fontWeight: 'medium', bgcolor: 'action.hover' }}>Split</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'medium', bgcolor: 'action.hover' }}>Distance</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'medium', bgcolor: 'action.hover' }}>Time</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'medium', bgcolor: 'action.hover' }}>Status</TableCell>
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
                                                        fontWeight: 'medium',
                                                        minWidth: 80
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