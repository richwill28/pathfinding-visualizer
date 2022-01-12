import Row from "./Row";
import { MAX_ROW } from "../constants";

function Body() {
  const rows = [];
  for (let i = 0; i < MAX_ROW; i++) {
    rows.push(<Row rowIndex={i} />);
  }

  return <div className="flex flex-col">{rows.map((row) => row)}</div>;
}

export default Body;
