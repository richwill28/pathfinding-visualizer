import { useState } from "react";
import Row from "./Row";
import { MAX_COL, MAX_ROW } from "../constants/variable";

function Body() {
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [endNode, setEndNode] = useState({
    row: MAX_ROW - 1,
    col: MAX_COL - 1,
  });

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [generate, setGenerate] = useState("WALL");

  const rows = [];
  for (let i = 0; i < MAX_ROW; i++) {
    rows.push(
      <Row
        key={`row-${i}`}
        index={i}
        startState={[startNode, setStartNode]}
        endState={[endNode, setEndNode]}
        mouseState={[isMouseDown, setIsMouseDown]}
        generateState={[generate, setGenerate]}
      />
    );
  }

  return <div className="flex flex-col">{rows.map((row) => row)}</div>;
}

export default Body;
