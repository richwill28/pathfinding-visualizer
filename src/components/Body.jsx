import { useEffect, useState } from "react";
import { MAX_ROW, MAX_COL } from "../utils/constants/variable";
import Node from "./Node";

function Body({ gridState, startState, endState }) {
  const [startNode, setStartNode] = startState;
  const [endNode, setEndNode] = endState;

  const [grid, setGrid] = gridState;

  useEffect(() => {
    setGrid(createGrid(startNode, endNode));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [generate, setGenerate] = useState("WALL");

  // TODO: to be removed
  useEffect(() => {
    console.log(startNode);
    console.log(endNode);
  }, [startNode, endNode]);

  return (
    <div className="flex flex-col border-l border-b border-sky-500">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row">
            {row.map((node, nodeIdx) => {
              return (
                <Node
                  key={nodeIdx}
                  index={{ row: node.row, col: node.col }}
                  mouseState={[isMouseDown, setIsMouseDown]}
                  generateState={[generate, setGenerate]}
                  startState={[startNode, setStartNode]}
                  endState={[endNode, setEndNode]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <div className="flex flex-col border-l border-b border-sky-500">
  //     {grid.map((row, rowIdx) => {
  //       return (
  //         <Row
  //           key={rowIdx}
  //           row={row}
  //           mouseState={[isMouseDown, setIsMouseDown]}
  //           generateState={[generate, setGenerate]}
  //           startState={[startNode, setStartNode]}
  //           endState={[endNode, setEndNode]}
  //         />
  //       );
  //     })}
  //   </div>
  // );
}

function createGrid(startNode, endNode) {
  const grid = [];
  for (let i = 0; i < MAX_ROW; i++) {
    grid.push(createRow(i, startNode, endNode));
  }
  return grid;
}

function createRow(index, startNode, endNode) {
  const row = [];
  for (let i = 0; i < MAX_COL; i++) {
    row.push(createNode(index, i, startNode, endNode));
  }
  return row;
}

function createNode(row, col, startNode, endNode) {
  return {
    row: row,
    col: col,
    distance: Infinity,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    isVisited: false,
    isWall: false,
  };
}

export default Body;
