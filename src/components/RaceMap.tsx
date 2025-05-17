import React from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { Paper, Box } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { goteborgsvarvet2025Route } from '../route/route';

// Component to handle map bounds
const MapBounds = () => {
    const map = useMap();
    React.useEffect(() => {
        const bounds = L.latLngBounds(goteborgsvarvet2025Route);
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [map]);
    return null;
};

const RaceMap: React.FC = () => {
    return (
        <Paper 
            elevation={0}
            sx={{ 
                mb: 4,
                borderRadius: 1,
                overflow: 'hidden',
                height: 400,
                position: 'relative',
                '& .leaflet-container': {
                    height: '100%',
                    width: '100%',
                    zIndex: 1
                }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}
            >
                <MapContainer
                    center={[57.7072, 11.9675]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                        positions={goteborgsvarvet2025Route}
                        pathOptions={{
                            color: '#0052CC',
                            weight: 4,
                            opacity: 1
                        }}
                    />
                    <MapBounds />
                </MapContainer>
            </Box>
        </Paper>
    );
};

export default RaceMap; 