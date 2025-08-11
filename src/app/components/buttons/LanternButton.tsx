'use client'

function LanternButton() {

    const playSound = () => {
        const audioElement = new Audio("audio/lantern.mp3");
        audioElement.play()
    }

    return (
        <div>
            <button className={`button__lantern absolute bottom-80 right-115 h-[20%] w-[6%] bg-transparent`}
                onClick={playSound}>
            </button>
        </div>
    );
}

export default LanternButton;