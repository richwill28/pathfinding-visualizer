import { useState } from "react";
import { MAX_COL } from "../utils/constants/max";
import Node from "./Node";

export default function Body({ setStartNode, setEndNode, gridState, isDark }) {
  const [grid, setGrid] = gridState;

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
        setStartNode({ row, col });
      } else if (generate === "END") {
        setEndNode({ row, col });
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
    <div
      className={`flex flex-col border-l border-b border-sky-200 w-[${
        MAX_COL * 20
      }px]`}
    >
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isVisited, isWall, isPath } =
                node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isVisited={isVisited}
                  isWall={isWall}
                  isPath={isPath}
                  onMouseDown={(row, col, isStart, isEnd) =>
                    handleMouseDown(row, col, isStart, isEnd)
                  }
                  onMouseUp={() => handleMouseUp()}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseOut={(row, col) => handleMouseOut(row, col)}
                  isDark={isDark}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// TODO: improve this
function createNewGrid(grid, row, col, style) {
  const newGrid = grid.slice(); // copy
  for (const row of newGrid) {
    for (const node of row) {
      node.isVisited = false;
      node.isPath = false;
    }
  }

  const newNode = {
    ...newGrid[row][col],
    isStart: false,
    isEnd: false,
    isVisited: false,
    isWall: false,
    isPath: false,
  };

  if (style === "WALL") {
    newNode.isWall = !newGrid[row][col].isWall;
  } else if (style === "START") {
    newNode.isStart = true;
  } else if (style === "END") {
    newNode.isEnd = true;
  } else if (style === "UNVISITED") {
    newNode.isVisited = false;
  }

  newGrid[row][col] = newNode;
  return newGrid;
}
