'use-client'

import Link from "next/link";


function SecretButton() {

    return (
        <div>
            <Link className={`button__door absolute bg-transparent top-[30%] left-[18%] h-[16%] aspect-square`}
                href="/to-the-teahouse">
            </Link>
        </div>
    );
}

export default SecretButton;