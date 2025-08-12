'use client'

function CatButton() {

    const onCatClick = () => {
        console.log("meow")
        const audioElement = new Audio("audio/meow.mp3");
        audioElement.play()
    }

    return (
        <div>
            <button className={`button__cat absolute bg-transparent bottom-[46%] right-[30%] h-[11%] w-[4%]`}
                onClick={onCatClick}>
            </button>
        </div>
    );
}

export default CatButton;