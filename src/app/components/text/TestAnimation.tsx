import React from 'react';
import { useTransition, animated } from '@react-spring/web'

function TestAnimation({ data = [1, 2, 3] }) {
    const transitions = useTransition(data, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0.2 },
    })


    return transitions((style, item) => (
        <animated.div style={style} className={""}>{item}</animated.div>
    ))

}

export default TestAnimation;