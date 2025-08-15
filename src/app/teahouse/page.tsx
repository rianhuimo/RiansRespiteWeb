'use client'

import { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

function Teahouse() {

    const { togglePlayPause, isPlaying } = useAudioPlayer("/audio/zonai_shrine.m4a", {
        autoplay: false,
        loop: false,
    })

    useEffect(() => {
        // runs once to start the music and animation
        console.log("message before timeout")
        let timer = setTimeout(
            () => {
                console.log("now playing audio")
                togglePlayPause()
            }, 
            2 * 1000);
        
        return () => {
            clearTimeout(timer)
        } 
        // important to clear my timeout after it is run!
        // https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals
    }, [])

    async function startAnimation() {

    }

    return (
        <div className=" bg-black h-full place-content-center w-full">
            <img src={"/images/rians_teahouse.png"} className="absolute top-3 right-3 " />
            <video autoPlay loop muted
                className="object-cover h-full m-auto w-full border-amber-50">
                <source src={"/videos/teahouse_idle.mp4"} type="video/mp4" />
                Wuh oh, the video won't play!
            </video>
        </div>

    );
}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

export default Teahouse;