export interface Score {
    id: string; 
    userId: string;
    eventId: string; 
    totalPoints: number; // Total points scored by the user in the event
    rank: number; // Rank of the user based on total points in the event
    awarded: boolean; // Indicates if the score has been awarded
}