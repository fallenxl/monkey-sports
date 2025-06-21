export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status: "PENDING" | "OPEN" | "CLOSED" | "FINISHED";
    createdAt: Date;
    createdBy: string; // User ID of the creator
}