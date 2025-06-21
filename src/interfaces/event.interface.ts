export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status: "PENDING" | "OPEN" | "CLOSED" | "FINISHED";
    createdAt: Date;
    prize: string; // Prize for the event winner
    createdBy: string; // User ID of the creator
}