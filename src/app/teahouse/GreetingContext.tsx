'use client';
import { createContext } from "react";


export interface GreetingContextType {
    greeting: string;
    setGreeting: (greeting: string) => void;
}

export const GreetingContext = createContext<GreetingContextType | null>(null);
