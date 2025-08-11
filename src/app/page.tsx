
import BeerButton from "./components/buttons/BeerButton";
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
            <video autoPlay src={"/akhis_bar.mp4"} loop muted className="object-cover h-full m-auto w-full">
                Wuh oh, the video won't play!
            </video>

        </div>
    )
}