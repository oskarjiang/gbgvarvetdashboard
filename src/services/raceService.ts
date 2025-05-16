import axios from 'axios';
import { RaceResponse } from '../types/race';

const API_URL = 'https://apihub.mikatiming.net/ah/rest/appapi/meetinginfo/meeting/9TG4PPOP36D/results/splits';
const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
    throw new Error('REACT_APP_API_KEY environment variable is not set');
}

export const fetchRaceData = async (participantIds: string[]): Promise<RaceResponse> => {
    try {
        const response = await axios.post(API_URL, {
            lang: 'en',
            idParticipants: participantIds.join(',')
        }, {
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'authorization': `Basic ${API_KEY}`,
                'accept-encoding': 'gzip, deflate, br',
                'user-agent': 'goteborgsvarvet/1 CFNetwork/3826.500.111.2.2 Darwin/24.4.0',
                'accept-language': 'en-US,en;q=0.9'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching race data:', error);
        throw error;
    }
}; 