import Cell from "./Cell";
import { MAX_COL } from "../constants";

function Row({ rowIndex }) {
  const cells = [];
  for (let i = 0; i < MAX_COL; i += 1) {
    cells.push(<Cell rowIndex={rowIndex} colIndex={i} />);
  }

  return <div className="flex flex-row">{cells.map((cell) => cell)}</div>;
}

export default Row;
