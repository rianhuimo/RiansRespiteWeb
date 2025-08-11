'use client'

function BeerButton() {

    const playSound = () => {
        const audioElement = new Audio("audio/beer.mp3");
        audioElement.play()
    }

    return (
        <div>
            <button className={`button__beer absolute bg-transparent bottom-10 right-138 h-[20%] w-[6%]`}
                onClick={playSound}>
            </button>
        </div>
    );
}

export default BeerButton;