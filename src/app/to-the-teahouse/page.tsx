'use client'

import { redirect, RedirectType } from 'next/navigation'

function ToTheTeahouse() {

    return (
        <div className=" bg-black h-full place-content-center w-full">
            <img src={"/images/transition_teahouse.png"} className="absolute top-3 right-3 "/>
            <video autoPlay className="object-cover h-full m-auto w-full border-amber-50" 
                onEnded={() => redirect('/teahouse', RedirectType.replace)}>
                <source src={"/videos/transition_teahouse.mp4"} type="video/mp4" />
                Wuh oh, the video won't play!
            </video>
        </div>
    );
}

export default ToTheTeahouse;