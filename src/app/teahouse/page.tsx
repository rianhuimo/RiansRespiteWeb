'use client'

import { useContext, useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import ShrineGreeting from "../components/text/ShrineGreeting";
import { GreetingContext, Greetings, GreetingProps } from "./GreetingContext";

function Teahouse() {

    const [greetings, setGreetings] = useState<Greetings>({greetings: []})

    const { togglePlayPause, isPlaying } = useAudioPlayer("/audio/zonai_shrine.wav", {
        autoplay: false,
        loop: false,
    })

    async function startGreetingSequence() {
        // Pass all the greetings to the state. 
        // ShrineGreeting.tsx component receives this and makes fade-in/fade-out animations
        setGreetings({
            greetings: [
                {
                    greeting: "Welcome to my teahouse",
                    duration: 7800
                },
                {
                    greeting: "I have teas of every kind",
                    duration: 7700
                },
                {
                    greeting: "Along with an assortment of milks. Except dairy milk.",
                    duration: 8000
                },
                {
                    greeting: "I am lactose intolerant...",
                    duration: 10000
                },
            ]
        })
    }

    // runs once to start the music and animation
    useEffect(() => {
        // console.log("message before timeout")
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
        <GreetingContext.Provider value={greetings}>
            <div className=" bg-black h-full justify-center w-full">
                <img src={"/images/rians_teahouse.png"} className="absolute top-3 right-3 " />
                <video autoPlay loop muted
                    className="object-cover h-full m-auto w-full border-amber-50">
                    <source src={"/videos/teahouse_idle.mp4"} type="video/mp4" />
                    Wuh oh, the video won't play!
                </video>
                <ShrineGreeting className="absolute top-[30%] w-full text-center" />
            </div>
        </GreetingContext.Provider>
    );
}


export default Teahouse;