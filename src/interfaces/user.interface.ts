export interface User {
    id: string;
    email: string;
    username: string;
    totalPoints: number;
    role: "USER" | "ADMIN"; // USER || ADMIN
    name?: string; // Optional field for user's name
}