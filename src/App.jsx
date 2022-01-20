import { useState } from "react";
import { MAX_ROW, MAX_COL } from "./utils/constants/max";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const INITIAL_START = { row: 1, col: 1 };
const INITIAL_END = { row: MAX_ROW - 2, col: MAX_COL - 2 };

export default function App() {
  const prefersDark =
    localStorage.theme === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(prefersDark);

  const [startNode, setStartNode] = useState(INITIAL_START);
  const [endNode, setEndNode] = useState(INITIAL_END);

  const [grid, setGrid] = useState(createGrid(startNode, endNode));

  const [algorithm, setAlgorithm] = useState("DIJKSTRA");
  const [maze, setMaze] = useState("RECURSIVE DIVISION");

  const [isGraphVisualized, setIsGraphVisualized] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="transition duration-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full gap-y-[15px]">
          <div className="min-h-[60px] px-40 border-b shadow-md dark:shadow-gray-600">
            <Header
              gridState={[grid, setGrid]}
              startNode={startNode}
              endNode={endNode}
              algorithmState={[algorithm, setAlgorithm]}
              mazeState={[maze, setMaze]}
              isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
              isDarkState={[isDark, setIsDark]}
            />
          </div>
          <div className={`px-40 min-h-[${MAX_ROW * 20}px]`}>
            <Body
              startNodeState={[startNode, setStartNode]}
              endNodeState={[endNode, setEndNode]}
              gridState={[grid, setGrid]}
              algorithm={algorithm}
              isGraphVisualized={isGraphVisualized}
              isDark={isDark}
            />
          </div>
          <div className="px-40">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export function createGrid(startNode, endNode) {
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
    isPath: false,
    parent: null,
  };
}
