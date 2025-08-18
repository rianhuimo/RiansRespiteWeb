"use client"
import { useTrail, animated } from '@react-spring/web'
import { useState } from 'react'

export default function MyComponent() {

    const [open, set] = useState(false)

    const [trails, api] = useTrail(
        5,
        () => ({
            from: { opacity: 0 },
            opacity: open ? 1 : 0,
        }),
        []
    )

    function handleClick() {
        set(!open)
    }

    return (
        <div onClick={handleClick}>
            {trails.map((props,index) => (
                <animated.div 
                key={index}
                style={{
                    ...props,
                    width: 80,
                    height: 80,
                    background: '#ff6d6d',
                    borderRadius: 8,
                }} className={"place-content-center text-center"}>
                    Hello World {index}
                </animated.div>
            ))}
        </div>
    )
}
