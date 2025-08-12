'use client'

import { redirect, RedirectType } from 'next/navigation'

function Teahouse() {


    return (
        <div className=" bg-black h-full place-content-center w-full">
            <img src={"/images/rians_teahouse.png"} className="absolute top-3 right-3 "/>
            <video autoPlay loop muted className="object-cover h-full m-auto w-full border-amber-50">
                <source src={"/videos/teahouse_idle.mp4"} type="video/mp4" />
                Wuh oh, the video won't play!
            </video>
        </div>
    );
}

export default Teahouse;