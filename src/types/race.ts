export interface Split {
    key: string;
    name: string;
    km: number;
    time: number;
    estimated: boolean;
}

export interface Runner {
    idMeeting: string;
    meetingTitle: string;
    meetingDate: number;
    idRace: string;
    raceTitle: string;
    raceScheduledStartDateTime: string;
    raceScheduledEndDateTime: string;
    idEvent: string;
    eventKey: string;
    eventTitle: string;
    startNo: string;
    firstname: string;
    lastname: string;
    displayName: string;
    displayNameShort: string;
    addressCity: string;
    addressState: string;
    addressCountry: string;
    birthYear: number;
    birthDate: number;
    ageOnRaceDay: number;
    ageGroup: string;
    finishTimeNet: string;
    finishTimeGross: string;
    nationality: string;
    idParticipant: string;
    sex: string;
    startGroup: string;
    splits: Split[];
    status: string;
    disqual: string;
    startTime: string;
    startTimeSeconds: number;
    startTimeNet: string;
    startTimeNetSeconds: number;
    startTimeGross: string;
    startTimeGrossSeconds: number;
    startDateTime: string;
    estimatedFinishTime: string;
    estimatedKm: number;
    estimatedValidUntilKm: number;
    estimatedMetersH: number;
    estimatedPosSource: string;
    idTrack: string;
    idPerson: string;
    active: string;
}

export interface RaceResponse {
    results: Runner[];
    countResults: number;
    numResults: number;
    numResultsPage: number;
    minLogId: string | null;
    maxLogId: string | null;
    nextLogId: string | null;
    nextPage: string | null;
} 