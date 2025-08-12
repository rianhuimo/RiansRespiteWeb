'use client'

import { useEffect, useState } from "react";

function MusicButton() {

    const [music, setMusic] = useState(false)
    const [audioElement, setAudioElement] = useState<HTMLAudioElement>()

    useEffect(() => {
        if (audioElement) {
            console.log("the track is loaded")
            if (music) {
                audioElement.play()
            } else {
                audioElement.pause()
            }
        } else {
            console.log("audio is not set yet")
            setAudioElement(new Audio("audio/bbl_brandee_younger.mp3"))
        }
    }, [music])

    const toggleMusic = () => {
        setMusic(!music)
    }

    return (
        <div>
            <button className={`${music ? "button__music__on" : "button__music__off"} absolute bg-transparent bottom-[28%] left-[12%] h-[16%] aspect-square`}
                onClick={toggleMusic}>
            </button>
        </div>
    );
}

export default MusicButton;