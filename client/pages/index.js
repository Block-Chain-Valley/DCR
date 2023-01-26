import MovieList from "../components/meetups/MovieList";

const DUMMY_DATA = [
  {
    title: "Avengers: Infinity War",
    id: "k1",
    image: "https://en.wikipedia.org/wiki/Avengers:_Infinity_War#/media/File:Avengers_Infinity_War_poster.jpg",
    description: "It's the thrid movie of Avengers series from Marval"
  },
  {
    title: "Avengers: End Game",
    id: "k2",
    image: "https://en.wikipedia.org/wiki/Avengers:_Endgame#/media/File:Avengers_Endgame_poster.jpg",
    description: "It's the forth movie of Avengers series from Marval"
  }
]

const HomePage = () => {
  return <MovieList />
}

export default HomePage;