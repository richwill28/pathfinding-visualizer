import { useState } from "react";
import bfs from "../utils/algorithms/graph/bfs";
import dfs from "../utils/algorithms/graph/dfs";
import dijkstra from "../utils/algorithms/graph/dijkstra";
import astar from "../utils/algorithms/graph/astar";
import binaryTree from "../utils/algorithms/maze/binaryTree";
import recursiveDivision from "../utils/algorithms/maze/recursiveDivision";
import huntAndKill from "../utils/algorithms/maze/huntAndKill";
import randomizedKruskal from "../utils/algorithms/maze/randomizedKruskal";
import isEqual from "../utils/isEqual";
import generateBorder from "../utils/generateBorder";
import animatePath from "../utils/animatePath";
import { MAX_ROW, MAX_COL } from "../utils/constants/max";
import { SunIcon, MoonIcon } from "./Icon";
import { STYLE_UNVISITED } from "../utils/constants/style";
import greedybfs from "../utils/algorithms/graph/greedybfs";

export default function Header({
  gridState,
  startNode,
  endNode,
  algorithmState,
  mazeState,
  isGraphVisualizedState,
  isDarkState,
}) {
  const [grid, setGrid] = gridState;

  const [isGraphVisualized, setIsGraphVisualized] = isGraphVisualizedState;

  const [algorithm, setAlgorithm] = algorithmState;

  const handleAlgoChoice = (algo) => {
    setAlgorithm(algo);
  };

  const [maze, setMaze] = mazeState;

  const handleMazeChoice = (maze) => {
    setMaze(maze);
  };

  const handleGraphVisualization = () => {
    if (isGraphVisualized) {
      refreshGrid(grid);
      renderRefreshGrid(grid, startNode, endNode);
    }

    const { visitedNodes, shortestPath } = runGraphAlgorithm(
      algorithm,
      grid,
      startNode,
      endNode
    );
    animatePath(visitedNodes, shortestPath);

    // re-render grid
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
    }, 10 * visitedNodes.length + 40 * (shortestPath.length + 40)); // not arbitrary value
  };

  const [isDark, setIsDark] = isDarkState;

  const handleMazeGeneration = () => {
    cleanGrid(grid);
    renderCleanGrid(grid, startNode, endNode);

    runMazeAlgorithm(maze, grid, startNode, endNode, isDark);

    // re-render grid
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const toggleIcon = isDark ? <MoonIcon /> : <SunIcon />;

  const [toggleAnimation, setToggleAnimation] = useState("");

  const toggleButton = () => {
    setToggleAnimation("transition ease-linear animate-toggleOff");
    setTimeout(() => {
      setToggleAnimation("transition ease-linear animate-toggleOn");
    }, 120);
    setTimeout(() => {
      setIsDark(!isDark);
      localStorage.theme = isDark ? "light" : "dark";
    }, 80);
  };

  return (
    <div className="flex flex-row h-full items-center justify-between">
      <button
        className="text-center text-2xl font-mono font-extrabold"
        onClick={() => window.location.reload()}
      >
        PATHFINDING VISUALIZER
      </button>
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
                    onClick={() => handleMazeChoice("BINARY TREE")}
                  >
                    BINARY TREE
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleMazeChoice("RECURSIVE DIVISION")}
                  >
                    RECURSIVE DIVISION
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleMazeChoice("HUNT-AND-KILL")}
                  >
                    HUNT-AND-KILL
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleMazeChoice("RANDOMIZED KRUSKAL")}
                  >
                    RANDOMIZED KRUSKAL
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
                    A-STAR
                  </button>
                  <button
                    className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgoChoice("GREEDY BFS")}
                  >
                    GREEDY BFS
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

export function runGraphAlgorithm(algorithm, grid, startNode, endNode) {
  if (algorithm === "BFS") {
    return bfs(grid, startNode, endNode);
  } else if (algorithm === "DFS") {
    return dfs(grid, startNode, endNode);
  } else if (algorithm === "DIJKSTRA") {
    return dijkstra(grid, startNode, endNode);
  } else if (algorithm === "A*") {
    return astar(grid, startNode, endNode);
  } else if (algorithm === "GREEDY BFS") {
    return greedybfs(grid, startNode, endNode);
  }
}

function runMazeAlgorithm(maze, grid, startNode, endNode, isDark) {
  if (maze === "BINARY TREE") {
    binaryTree(grid, startNode, endNode, isDark);
  } else if (maze === "RECURSIVE DIVISION") {
    generateBorder(grid, startNode, endNode, isDark);
    recursiveDivision(
      grid,
      startNode,
      endNode,
      1,
      1,
      (MAX_ROW - 2 + 1) / 2,
      (MAX_COL - 2 + 1) / 2,
      isDark
    );
  } else if (maze === "HUNT-AND-KILL") {
    huntAndKill(grid, startNode, endNode, isDark);
  } else if (maze === "RANDOMIZED KRUSKAL") {
    randomizedKruskal(grid, startNode, endNode, isDark);
  }
}

// preserve walls
export function refreshGrid(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.isPath = false;
      node.parent = null;
    }
  }
}

function renderRefreshGrid(grid, startNode, endNode) {
  for (const row of grid) {
    for (const node of row) {
      if (!node.isWall) {
        if (!isEqual(startNode, node) && !isEqual(endNode, node)) {
          document.getElementById(`${node.row}-${node.col}`).className =
            STYLE_UNVISITED;
        }
      }
    }
  }
}

// does not preserve walls
export function cleanGrid(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.isWall = false;
      node.isPath = false;
      node.parent = null;
    }
  }
}

function renderCleanGrid(grid, startNode, endNode) {
  for (const row of grid) {
    for (const node of row) {
      if (!isEqual(startNode, node) && !isEqual(endNode, node)) {
        document.getElementById(`${node.row}-${node.col}`).className =
          STYLE_UNVISITED;
      }
    }
  }
}
