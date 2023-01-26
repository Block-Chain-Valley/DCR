import MovieItem from './MovieItem';
import classes from './MeetupList.module.css';

function MovieList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MovieItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
        />
      ))}
    </ul>
  );
}

export default MovieList;
