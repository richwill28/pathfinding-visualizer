import { useState } from "react";
import Row from "./Row";
import { MAX_ROW } from "../constants/variable";

function Body() {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [generate, setGenerate] = useState("WALL");

  const rows = [];
  for (let i = 0; i < MAX_ROW; i++) {
    rows.push(
      <Row
        key={`row-${i}`}
        index={i}
        mouseState={[isMouseDown, setIsMouseDown]}
        generateState={[generate, setGenerate]}
      />
    );
  }

  return <div className="flex flex-col">{rows.map((row) => row)}</div>;
}

export default Body;
