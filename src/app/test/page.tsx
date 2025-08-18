"use client"
import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import MyComponent from './MyComponent';

function What() {

    return (
        <div className='w-full h-full bg-white place-content-center'>
            {/* <TestAnimation/> */}
            <MyComponent/>
        </div>
    );
}

export default What;