'use client';
import { createContext } from "react";

export interface GreetingProps {
    greeting: string;
    duration: number;
}

export interface Greetings {
    greetings: GreetingProps[]
}

export const GreetingContext = createContext<Greetings | null>(null);
