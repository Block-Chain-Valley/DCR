import Card from "../ui/Card";
import { useRouter } from "next/router";

const MovieItem = () => {
    const router = useRouter();
    const showDetailHandler = () => {
        router.push("/" + props.id)
    }
    return(
        <li>
            <Card>
                <div>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div>
                    <h3>{props.title}</h3>
                </div>
                <div>
                    <button onClick={showDetailHandler}>Show Details</button>
                </div>
            </Card>
        </li>
    )
};

export default MovieItem;