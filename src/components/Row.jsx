import Node from "./Node";
import { MAX_COL } from "../constants/variable";

function Row({ index, mouseState, generateState }) {
  const nodes = [];
  for (let i = 0; i < MAX_COL; i += 1) {
    nodes.push(
      <Node
        key={`node-(${index}, ${i})`}
        index={{ row: index, col: i }}
        mouseState={mouseState}
        generateState={generateState}
      />
    );
  }

  return <div className="flex flex-row">{nodes.map((node) => node)}</div>;
}

export default Row;
