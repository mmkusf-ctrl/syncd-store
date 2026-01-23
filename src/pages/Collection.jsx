import { Link, useParams } from "react-router-dom";
import "./Collection.css";

export default function Collection() {
  const { type } = useParams();

  return (
    <div className="collection">
      <h1>{type.toUpperCase()} COLLECTION</h1>

      <div className="collection-buttons">
        <Link to={`/collection/${type}/necklace`}>NECKLACE</Link>
        <Link to={`/collection/${type}/earrings`}>EAR RINGS</Link>
        <Link to={`/collection/${type}/bracelet`}>BRACELET</Link>
      </div>
    </div>
  );
}
