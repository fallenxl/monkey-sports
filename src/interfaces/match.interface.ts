export interface Match {
    id: string;
    eventId: string;
    teamA: string; 
    teamB: string; 
    matchDate: Date; 
    result: null | "A" | "B" | "DRAW"; // Result of the match: "A" for Team A win, "B" for Team B win, "DRAW" for a draw, or null if not yet played
}