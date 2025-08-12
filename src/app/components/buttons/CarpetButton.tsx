'use client'

import { useEffect, useState } from "react";

function CarpetButton() {

    const [playMusic, setPlayMusic] = useState(-1)
    const [audioElement, setAudioElement] = useState<HTMLAudioElement>()

    useEffect(() => {
        if (audioElement) {
            console.log("the track is loaded")
            if (playMusic % 2 == 0) {
                audioElement.play()
            } else {
                audioElement.pause()
            }
        } else {
            console.log("audio is not set yet")
            setAudioElement(new Audio("audio/carpet_toby_fox.opus"))
        }
    }, [playMusic])

    const toggleMusic = () => {
        setPlayMusic(playMusic + 1)
    }

    return (
        <div>
            <button className={`${(playMusic > 5) ? "button__ralsei" : (playMusic % 2 == 0) ? "button__carpet__on" : "button__carpet__off"} absolute bg-transparent bottom-[0%] left-[15%] h-[25%] aspect-square`}
                onClick={toggleMusic}>
            </button>
        </div>
    );
}

export default CarpetButton;