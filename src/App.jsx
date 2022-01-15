import { useState } from "react";
import { MAX_ROW, MAX_COL } from "./utils/constants/variable";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const INITIAL_START = { row: 9, col: 9 };
const INITIAL_END = { row: 29, col: 39 };

export default function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(prefersDark);

  const [startNode, setStartNode] = useState(INITIAL_START);
  const [endNode, setEndNode] = useState(INITIAL_END);

  const [grid, setGrid] = useState(createGrid(startNode, endNode));

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="transition duration-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full gap-y-[15px]">
          <div className="min-h-[60px] px-40 border-b shadow-md dark:shadow-gray-600">
            <Header
              grid={grid}
              startNode={startNode}
              endNode={endNode}
              isDarkState={[isDark, setIsDark]}
            />
          </div>
          <div className="min-h-[600px] px-40">
            <Body
              setStartNode={setStartNode}
              setEndNode={setEndNode}
              gridState={[grid, setGrid]}
              isDark={isDark}
            />
          </div>
          <div className="px-40">
            <Footer isDark={isDark} />
          </div>
        </div>
      </div>
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
    isPath: false,
    parent: null,
  };
}
