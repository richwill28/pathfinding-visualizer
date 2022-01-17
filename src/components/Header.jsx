import { useState } from "react";
import bfs from "../utils/algorithms/graph/bfs";
import dfs from "../utils/algorithms/graph/dfs";
import dijkstra from "../utils/algorithms/graph/dijkstra";
import astar from "../utils/algorithms/graph/astar";
import recursiveDivision from "../utils/algorithms/maze/recursiveDivision";
import { animatePath, animateWall } from "../utils/animation";
import { MAX_ROW, MAX_COL } from "../utils/constants/max";
import { SunIcon, MoonIcon } from "./Icon";

export default function Header({ grid, startNode, endNode, isDarkState }) {
  const [algorithm, setAlgorithm] = useState("DIJKSTRA");

  const handleAlgoChoice = (algo) => {
    setAlgorithm(algo);
  };

  const [maze, setMaze] = useState("RECURSIVE DIVISION");

  const handleMazeChoice = (maze) => {
    setMaze(maze);
  };

  const handleGraphVisualization = () => {
    const { visitedNodes, shortestPath } = runGraphAlgorithm(
      algorithm,
      grid,
      startNode,
      endNode
    );
    animatePath(visitedNodes, shortestPath);
  };

  const handleMazeGeneration = () => {
    const walls = [];
    runMazeAlgorithm(maze, grid, walls, startNode, endNode);
    animateWall(walls);
  };

  const [isDark, setIsDark] = isDarkState;

  const toggleIcon = isDark ? <MoonIcon /> : <SunIcon />;

  const [toggleAnimation, setToggleAnimation] = useState("");

  const toggleButton = () => {
    setToggleAnimation("transition ease-linear animate-toggleOff");
    setTimeout(() => {
      setToggleAnimation("transition ease-linear animate-toggleOn");
    }, 120);
    setTimeout(() => {
      setIsDark(!isDark);
    }, 80);
  };

  return (
    <div className="flex flex-row h-full items-center justify-between">
      <div className="text-center text-2xl font-mono font-extrabold">
        PATHFINDING VISUALIZER
      </div>
      <div className="flex flex-row items-center gap-6">
        <div className="relative group">
          <button
            className="transition ease-in border-2 border-transparent hover:bg-sky-400 active:bg-sky-500 text-[15px] font-mono font-bold rounded px-2.5 py-1"
            onClick={handleMazeGeneration}
          >
            {maze}
          </button>
          <div className="hidden group-hover:table">
            <div className="absolute z-10 -ml-[12px] transform px-2 w-screen max-w-[215px] py-1.5">
              <div className="shadow-lg ring-1 ring-black dark:rink-white ring-opacity-5">
                <div className="relative grid gap-1 bg-white px-2 py-2 rounded dark:bg-slate-900">
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleMazeChoice("RECURSIVE DIVISION")}
                  >
                    RECURSIVE DIVISION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <button className="transition ease-in border-2 border-transparent hover:border-sky-400 text-[15px] font-mono font-bold rounded px-2.5 py-1">
            {algorithm}
          </button>
          <div className="hidden group-hover:table">
            <div className="absolute z-10 -ml-[12px] transform px-2 w-screen max-w-[215px] py-1.5">
              <div className="shadow-lg ring-1 ring-black dark:rink-white ring-opacity-5">
                <div className="relative grid gap-1 bg-white px-2 py-2 rounded dark:bg-slate-900">
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgoChoice("BFS")}
                  >
                    BREADTH-FIRST SEARCH
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgoChoice("DFS")}
                  >
                    DEPTH-FIRST SEARCH
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgoChoice("DIJKSTRA")}
                  >
                    DIJKSTRA
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgoChoice("A*")}
                  >
                    A* SEARCH
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="transition ease-in bg-sky-400 hover:bg-sky-500 text-[15px] font-mono font-bold rounded px-2.5 py-1 shadow-md shadow-sky-900/50 active:shadow-sky-900/30 dark:shadow-sky-400/50 dark:active:shadow-sky-400/30"
          onClick={handleGraphVisualization}
        >
          VISUALIZE
        </button>
        <button className={toggleAnimation} onClick={toggleButton}>
          {toggleIcon}
        </button>
      </div>
    </div>
  );
}

function runGraphAlgorithm(algorithm, grid, startNode, endNode) {
  if (algorithm === "BFS") {
    return bfs(grid, startNode, endNode);
  } else if (algorithm === "DFS") {
    return dfs(grid, startNode, endNode);
  } else if (algorithm === "DIJKSTRA") {
    return dijkstra(grid, startNode, endNode);
  } else if (algorithm === "A*") {
    return astar(grid, startNode, endNode);
  }
}

function runMazeAlgorithm(maze, grid, walls, startNode, endNode) {
  if (maze === "RECURSIVE DIVISION") {
    generateBorder(grid, walls);
    recursiveDivision(
      grid,
      startNode,
      endNode,
      walls,
      1,
      1,
      (MAX_ROW - 2 + 1) / 2,
      (MAX_COL - 2 + 1) / 2
    );
  }
}

function generateBorder(grid, walls) {
  // top
  for (let i = 0; i < MAX_COL; i++) {
    grid[0][i].isWall = true;
    walls.push(grid[0][i]);
  }

  // right
  for (let i = 1; i < MAX_ROW; i++) {
    grid[i][MAX_COL - 1].isWall = true;
    walls.push(grid[i][MAX_COL - 1]);
  }

  // bottom
  for (let i = MAX_COL - 2; i >= 0; i--) {
    grid[MAX_ROW - 1][i].isWall = true;
    walls.push(grid[MAX_ROW - 1][i]);
  }

  // left
  for (let i = MAX_ROW - 2; i >= 1; i--) {
    grid[i][0].isWall = true;
    walls.push(grid[i][0]);
  }
}
