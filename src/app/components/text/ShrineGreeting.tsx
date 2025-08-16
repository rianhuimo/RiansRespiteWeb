"use-client"
import React, { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web'
import { GreetingContext, GreetingContextType } from "@/app/teahouse/GreetingContext";

interface ShrineGreetingProps {
    className: string,
}

function ShrineGreeting({ className }: ShrineGreetingProps) {

    const { greeting, setGreeting } = useContext(GreetingContext) as GreetingContextType

    useEffect(() => {
        if (greeting != "") {
            startAnimation() // start animation with the specified duration e.g. 2 seconds
        }
    }, [greeting])

    const [springs, api] = useSpring(() => ({
        from: { opacity:0 },
    }))

    const startAnimation = () => {
        api.start({
            from: {
                opacity:0
            },
            to: {
                opacity:1
            },
        })
    }

    return (
        <animated.div
            onClick={startAnimation}
            style={{
                ...springs,
            }}
            className={className + " " + "font-[calamity] text-3xl shrine_text"}>
            {greeting}
        </animated.div>
    );
}

export default ShrineGreeting;