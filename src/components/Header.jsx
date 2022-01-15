import { useState } from "react";
import bfs from "../utils/algorithms/bfs";
import dfs from "../utils/algorithms/dfs";
import dijkstra from "../utils/algorithms/dijkstra";
import astar from "../utils/algorithms/astar";
import animate from "../utils/animate";
import { SunIcon, MoonIcon } from "./Icon";

export default function Header({ grid, startNode, endNode, isDarkState }) {
  const [algorithm, setAlgorithm] = useState("DIJKSTRA");

  const handleVisualization = () => {
    const { visitedNodes, shortestPath } = runAlgorithm(
      algorithm,
      grid,
      startNode,
      endNode
    );
    animate(visitedNodes, shortestPath);
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

  const handleAlgoChoice = (algo) => {
    setAlgorithm(algo);
  };

  return (
    <div className="flex flex-row h-full items-center justify-between">
      <div className="text-center text-2xl font-mono font-extrabold">
        PATHFINDING VISUALIZER
      </div>
      <div className="flex flex-row items-center gap-6">
        <div className="relative group">
          <button className="transition linear border-2 border-transparent hover:border-sky-400 text-[15px] font-mono font-bold rounded px-2.5 py-1">
            {algorithm}
          </button>
          <div className="hidden group-hover:table">
            <div className="absolute z-10 -ml-[12px] transform px-2 w-screen max-w-[215px] py-1.5">
              <div className="rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-1 bg-white px-2 py-2">
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
          className="bg-sky-400 hover:bg-sky-500 text-[15px] font-mono font-bold rounded px-2.5 py-1 shadow-md shadow-sky-900/50 active:shadow-sky-900/30 dark:shadow-sky-400/50 dark:active:shadow-sky-400/30"
          onClick={handleVisualization}
        >
          VISUALIZE
        </button>
        <div className={toggleAnimation} onClick={toggleButton}>
          {toggleIcon}
        </div>
      </div>
    </div>
  );
}

function runAlgorithm(algorithm, grid, startNode, endNode) {
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
