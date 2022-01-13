import Node from "./Node";

function Row({ row, mouseState, generateState, startState, endState }) {
  return (
    <div className="flex flex-row">
      {row.map((node, nodeIdx) => {
        return (
          <Node
            key={nodeIdx}
            index={{ row: node.row, col: node.col }}
            mouseState={mouseState}
            generateState={generateState}
            startState={startState}
            endState={endState}
          />
        );
      })}
    </div>
  );
}

export default Row;
