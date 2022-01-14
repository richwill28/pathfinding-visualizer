import { useState } from "react";
import dijkstra from "../utils/algorithms/dijkstra";
import animate from "../utils/animate";
import { SunIcon, MoonIcon } from "./Icon";

export default function Header({ grid, startNode, endNode, isDarkState }) {
  const visualize = () => {
    const { visitedNodes, shortestPath } = dijkstra(grid, startNode, endNode);
    animate(visitedNodes, shortestPath);
  };

  const [isDark, setIsDark] = isDarkState;

  const toggleIcon = isDark ? (
    <MoonIcon isDark={isDark} />
  ) : (
    <SunIcon isDark={isDark} />
  );

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
        <button
          className="bg-sky-400 hover:bg-sky-500 text-[15px] font-mono font-bold rounded px-2.5 py-1 shadow-md shadow-sky-900/50 active:shadow-sky-900/30 dark:shadow-sky-400/50 dark:active:shadow-sky-400/30"
          onClick={visualize}
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
