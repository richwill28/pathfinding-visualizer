import Row from "./Row";
import { MAX_ROW } from "../constants/variable";
import { useState, useEffect } from "react";

function Body() {
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [endNode, setEndNode] = useState({ row: 39, col: 49 });

  const rows = [];
  for (let i = 0; i < MAX_ROW; i++) {
    rows.push(<Row index={i} startNode={startNode} endNode={endNode} />);
  }

  return <div className="flex flex-col">{rows.map((row) => row)}</div>;
}

export default Body;
