import { useState } from "react";
import { MAX_COL } from "../utils/constants/max";
import { runGraphAlgorithm, refreshGrid } from "./Header";
import Node from "./Node";

export default function Body({
  startNodeState,
  endNodeState,
  gridState,
  algorithm,
  isGraphVisualized,
  isDark,
}) {
  const [startNode, setStartNode] = startNodeState;
  const [endNode, setEndNode] = endNodeState;

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
      const newGrid = createNewGrid(grid, row, col, "WALL", isGraphVisualized);
      setGrid(newGrid);
      setGenerate("WALL");
    }
  };

  const handleMouseUp = (row, col) => {
    if (generate !== "WALL") {
      if (!isGraphVisualized) {
        const newGrid = createNewGrid(
          grid,
          row,
          col,
          generate,
          isGraphVisualized
        );

        if (generate === "START") {
          const newStartNode = { row, col };
          setStartNode(newStartNode);
        } else if (generate === "END") {
          const newEndNode = { row, col };
          setEndNode(newEndNode);
        }

        setGrid(newGrid);
      }
    }

    setIsMouseDown(false);
    setGenerate("WALL");
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      const newGrid = createNewGrid(
        grid,
        row,
        col,
        generate,
        isGraphVisualized
      );

      if (isGraphVisualized) {
        if (generate === "START") {
          const newStartNode = { row, col };
          setStartNode(newStartNode);
          // re-evaluate graph algorithm (not efficient?)
          runGraphAlgorithm(algorithm, newGrid, newStartNode, endNode);
        } else if (generate === "END") {
          const newEndNode = { row, col };
          setEndNode(newEndNode);
          // re-evaluate graph algorithm (not efficient?)
          runGraphAlgorithm(algorithm, newGrid, startNode, newEndNode);
        }
      }

      setGrid(newGrid);
    }
  };

  const handleMouseOut = (row, col) => {
    if (generate !== "WALL") {
      const newGrid = createNewGrid(
        grid,
        row,
        col,
        "UNVISITED",
        isGraphVisualized
      );
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
                  onMouseUp={(row, col) => handleMouseUp(row, col)}
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

function createNewGrid(grid, row, col, generate, isGraphVisualized) {
  const newGrid = grid.slice(); // copy

  const newNode = {
    ...newGrid[row][col],
    isStart: false,
    isEnd: false,
    isVisited: false,
    isWall: false,
    isPath: false,
  };

  if (generate === "WALL") {
    newNode.isWall = !newGrid[row][col].isWall;
  } else if (generate === "START") {
    if (isGraphVisualized) {
      refreshGrid(newGrid);
    }
    newNode.isStart = true;
  } else if (generate === "END") {
    if (isGraphVisualized) {
      refreshGrid(newGrid);
    }
    newNode.isEnd = true;
  } else if (generate === "UNVISITED") {
    newNode.isVisited = false;
  }

  newGrid[row][col] = newNode;
  return newGrid;
}
