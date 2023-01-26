import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>DCR Movies</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home Page</Link>
          </li>
          <li>
            <Link href='/my-movies'>My Movies</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
