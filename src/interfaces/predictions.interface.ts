export interface Prediction {
    id: string;
    userId: string;
    matchId: string;
    predictedWinner: "A" | "B" | "DRAW"; // Predicted winner: "A" for Team A, "B" for Team B, or "DRAW"
    points: number; // -3 for incorrect, 0 for no prediction, 3 for correct
    createdAt: Date; 
}