'use client'

function CatButton() {

    const onCatClick = () => {
        console.log("meow")
        const audioElement = new Audio("audio/meow.mp3");
        audioElement.play()
    }

    return (
        <div>
            <button className={`button__cat absolute bg-transparent bottom-50 right-105 h-[10%] w-[2%]`}
                onClick={onCatClick}>
            </button>
        </div>
    );
}

export default CatButton;