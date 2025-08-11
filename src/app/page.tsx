
import BeerButton from "./components/buttons/BeerButton";
import CarpetButton from "./components/buttons/CarpetButton";
import CatButton from "./components/buttons/CatButton";
import LanternButton from "./components/buttons/LanternButton";
import MusicButton from "./components/buttons/MusicButton";

export default function Start() {

    return (
        <div className=" bg-black h-full place-content-center w-full">
            <MusicButton/>
            <CatButton/>
            <LanternButton/>
            <BeerButton/>
            <CarpetButton/>
            <img src={"/images/credit_aakhirah.png"} className="absolute top-3 right-3 "/>
            <video autoPlay src={"/videos/akhis_bar.mp4"} loop muted className="object-cover h-full m-auto w-full border-amber-50">
                Wuh oh, the video won't play!
            </video>

        </div>
    )
}