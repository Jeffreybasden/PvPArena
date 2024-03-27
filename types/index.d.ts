export interface Game {
    id?: number;
    pgn?: string;
    white?: User;
    black?: User;
    winner?: "white" | "black" | "draw";
    endReason?: "draw" | "checkmate" | "stalemate" | "repetition" | "insufficient" | "abandoned" | 'forfiet';
    host?: User;
    code?: string;
    unlisted?: boolean;
    timeout?: number;
    observers?: User[];  
    startedAt?: number;
    endedAt?: number;
    wager?:number;
    token?:string;
   
    
}

export interface User {
    id?: number | string; // string for guest IDs
    name?: string | null;
    email?: string;
    wins?: number;
    losses?: number;
    draws?: number;
    earnings?: number;
    wagerPaid?: boolean
    wallet?:string
    // mainly for players, not spectators
    connected?: boolean;
    disconnectedOn?: number;
}
