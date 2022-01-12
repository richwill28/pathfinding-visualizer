import Cell from "./Cell";
import { MAX_COL } from "../constants/variable";

function Row({ index, startNode, endNode }) {
  const cells = [];
  for (let i = 0; i < MAX_COL; i += 1) {
    cells.push(
      <Cell
        index={{ row: index, col: i }}
        startNode={startNode}
        endNode={endNode}
      />
    );
  }

  return <div className="flex flex-row">{cells.map((cell) => cell)}</div>;
}

export default Row;
