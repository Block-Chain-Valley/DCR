import classes from './MeetupDetail.module.css';

const MovieDetails = (props) => {
  return (
    <section className={classes.detail}>
      <img
        src={props.image}
        alt={props.title}
      />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  );
};

export default MovieDetails;