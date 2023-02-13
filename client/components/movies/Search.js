import { DummyMovie } from "./DummyMovie";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchItem) => {
    console.log("search", searchItem);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search your Movie"
          onChange={onChange}
        />
        <button onClick={() => {onSearch(value);}}>
          Search
        </button>
      </div>
      <div>
        <ul>
            {DummyMovie.filter((movie) => 
                movie.title.includes(value)
            ).map((movie) => (
                <li key={movie.id}>
                    <img src={IMG_BASE_URL + movie.poster_path} alt="영화 이미지"/>
                    {movie.title}
                </li>
            ))
            }
        </ul>
      </div>
    </div>
  );
};

export default Search;
