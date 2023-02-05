import classes from "./MainNavigation.module.css"
import Link from "next/link";


const MainNavigation = () => {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>DCR MOVIES</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>Home Page</Link>
                    </li>
                    <li>
                        <Link href='/my-profile/login'>Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;