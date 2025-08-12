'use-client'

import Link from "next/link";


function SecretButton() {

    return (
        <div>
            <Link className={`button__door absolute bg-transparent top-90 left-120 h-[8%] aspect-square`}
                href="/to-the-teahouse">
            </Link>
        </div>
    );
}

export default SecretButton;