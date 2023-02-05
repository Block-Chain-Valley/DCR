import MainNavigation from "@/components/layout/MainNavigation";
import { DummyMovie } from "@/components/movies/DummyMovie";
import Search from "@/components/movies/Search";

const HomePage = () => {
  return(
    <div>
      <MainNavigation />
      <Search />
    </div>
  )
}

export default HomePage;