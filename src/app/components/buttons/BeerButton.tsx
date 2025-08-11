'use client'

function BeerButton() {

    const playSound = () => {
        const audioElement = new Audio("audio/beer.mp3");
        audioElement.play()
    }

    return (
        <div>
            <button className={`button__beer absolute bg-transparent bottom-50 right-180 h-[20%] w-[8%]`}
                onClick={playSound}>
            </button>
        </div>
    );
}

export default BeerButton;