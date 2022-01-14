import { useEffect, useState } from "react";
import { MAX_ROW, MAX_COL } from "../utils/constants/variable";
import Node from "./Node";

export default function Body({ startNodeState, endNodeState, gridState }) {
  const [startNode, setStartNode] = startNodeState;
  const [endNode, setEndNode] = endNodeState;

  const [grid, setGrid] = gridState;

  useEffect(() => {
    setGrid(createGrid(startNode, endNode));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [generate, setGenerate] = useState("WALL");

  const handleMouseDown = (row, col, isStart, isEnd) => {
    setIsMouseDown(true);
    if (isStart) {
      setGenerate("START");
    } else if (isEnd) {
      setGenerate("END");
    } else {
      const newGrid = createNewGrid(grid, row, col, "WALL");
      setGrid(newGrid);
      setGenerate("WALL");
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setGenerate("WALL");
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col, generate);
      setGrid(newGrid);
      if (generate === "START") {
        setStartNode({ row: row, col: col });
      } else if (generate === "END") {
        setEndNode({ row: row, col: col });
      }
    }
  };

  const handleMouseOut = (row, col) => {
    if (generate !== "WALL") {
      const newGrid = createNewGrid(grid, row, col, "UNVISITED");
      setGrid(newGrid);
    }
  };

  return (
    <div className="flex flex-col border-l border-b border-sky-200">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isVisited, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isVisited={isVisited}
                  isWall={isWall}
                  onMouseDown={(row, col, isStart, isEnd) =>
                    handleMouseDown(row, col, isStart, isEnd)
                  }
                  onMouseUp={() => handleMouseUp()}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseOut={(row, col) => handleMouseOut(row, col)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
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

function createNewGrid(grid, row, col, style) {
  const newGrid = grid.slice(); // copy
  const newNode = { ...newGrid[row][col] }; // copy
  if (style === "WALL") {
    newNode.isWall = !newGrid[row][col].isWall;
  } else if (style === "START") {
    newNode.isStart = true;
    newNode.isWall = false;
  } else if (style === "END") {
    newNode.isEnd = true;
    newNode.isWall = false;
  } else if (style === "UNVISITED") {
    newNode.isStart = false;
    newNode.isEnd = false;
  }
  newGrid[row][col] = newNode;
  return newGrid;
}
