"use-client"
import React, { useContext, useEffect, useState } from 'react';
import { animated, easings, useSpring } from '@react-spring/web'
import { GreetingContext, Greetings } from "@/app/teahouse/GreetingContext";

interface ShrineGreetingProps {
    className: string,
}

function ShrineGreeting({ className }: ShrineGreetingProps) {

    const { greetings } = useContext(GreetingContext) as Greetings
    const [greeting, setGreeting] = useState("")

    const zonaiCharset = "BCDHJLMNRSTUWY"
    const [zonaiSymbols, setZonaiSymbols] = useState<string[]>([])
    const [symbolHeights, setHeights] = useState<number[]>([])

    // 1. I have a list of greetings and respective delays.
    // 2. Sequentially display these greetings, displaying the next greeting after the
    //    duration of the current one expires
    // 3. Before the next greeting, fade out the current one.

    useEffect(() => {
        if (greetings.length === 0) return
        // don't run the code below yet if the greetings have not been loaded in

        let delay = 0
        for (let i = 0; i < greetings.length; i++) {
            // Display the greeting and fade it in
            // Also generate some random zonai symbols
            setTimeout(() => {
                setGreeting(greetings[i]["greeting"])
                let symbols = []
                let heights = []
                for (let i = 0; i < 8; i++) {
                    symbols.push(zonaiCharset[Math.floor(Math.random() * zonaiCharset.length)])
                    heights.push((Math.floor(Math.random() * 24) - 12))
                }
                setZonaiSymbols(symbols)
                setHeights(heights)
                fadeIn()
            }, delay)

            // make it fade out after the duration
            delay = delay + greetings[i]["duration"]
            setTimeout(() => {
                fadeOut()
            }, (delay - 3000))
        }
    }, [greetings])

    const [springs, api] = useSpring(() => ({
        from: {
            opacity: 0,
            y: 0,
        },
    }))

    function fadeIn() {
        api.start({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
                duration: 800,
                easing: easings.easeInOutSine
            }
        })
    }

    function fadeOut() {
        api.start({
            from: {
                opacity: 1
            },
            to: {
                opacity: 0 // changed to 1 for debugging. will change back to 0 later.
            },
            config: {
                duration: 2000,
                easing: easings.easeInOutSine
            }
        })
    }

    return (
        <animated.div
            style={{
                ...springs,
            }}
            className={className + " " + "font-[calamity] text-3xl shrine_text w-full m-auto"}>
            <div className='m-auto w-xl'>
                {greeting}
            </div>
            <div className='m-auto w-2xl h-[25vh] opacity-40 absolute top-0 bottom-0 left-0 right-0 grid grid-cols-8'>
                {zonaiSymbols.map((item, key) => {
                    return (
                        <div key={key} className='h-full content-center'>
                            <p className={`font-[zonai] relative text-5xl text-emerald-200`} style={{top: `${symbolHeights[key] as any as string}%` }}>{item}</p>
                        </div>
                    )
                })}
            </div>
        </animated.div>
    );
}

export default ShrineGreeting;