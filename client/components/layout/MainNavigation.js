const { default: Link } = require("next/link")


const MainNavigation = () => {
    return(
        <header>
            <div>DCR MOVIES</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>Home Page</Link>
                    </li>
                    <li>
                        <Link href='/my-profile'>My Profile</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;