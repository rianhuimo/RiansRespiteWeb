'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import ShrineGreeting from "../components/text/ShrineGreeting";
import TestAnimation from "../components/text/TestAnimation";

export interface GreetingContextType {
    greeting: string,
    setGreeting: (greeting: string) => void
}

export const GreetingContext = createContext<GreetingContextType | null>(null);      

function Teahouse() {

    const [greeting,setGreeting] = useState("")

    const { togglePlayPause, isPlaying } = useAudioPlayer("/audio/zonai_shrine.wav", {
        autoplay: false,
        loop: false,
    })

    function startGreetingSequence() {
        setGreeting("Welcome to my teahouse lol")
        setTimeout(() => {
            setGreeting("I have teas of every kind")
        }, 7500);
        setTimeout(() => {
            setGreeting("Along with an assortment of milks. Except dairy milk.")
        }, 15000);
        setTimeout(() => {
            setGreeting("I am lactose intolerant...")
        }, 23500);
    }

    // runs once to start the music and animation
    useEffect(() => {
        console.log("message before timeout")
        let timer = setTimeout(
            () => {
                console.log("now playing audio")
                togglePlayPause()
                startGreetingSequence()
            },
            2 * 1000);
        return () => {
            clearTimeout(timer)
        }
        // important to clear my timeout after it is run!
        // https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals
    }, [])

    return (
        <GreetingContext.Provider value={{greeting,setGreeting}}>
            <div className=" bg-black h-full justify-center w-full">
                <img src={"/images/rians_teahouse.png"} className="absolute top-3 right-3 " />
                <video autoPlay loop muted
                    className="object-cover h-full m-auto w-full border-amber-50">
                    <source src={"/videos/teahouse_idle.mp4"} type="video/mp4" />
                    Wuh oh, the video won't play!
                </video>
                <ShrineGreeting className="absolute top-[30%] w-full text-center" />
                <TestAnimation/>
            </div>
        </GreetingContext.Provider>
    );
}


export default Teahouse;