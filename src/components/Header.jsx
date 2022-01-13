import Dijkstra from "../utils/algorithms/Dijkstra";

function Header({ gridState, startNode, endNode }) {
  const [grid, setGrid] = gridState;

  const handleClick = (event) => {
    console.log("click");
    Dijkstra(grid, setGrid, startNode, endNode);
  };

  return (
    <div className="bg-slate-800 flex flex-row h-full items-center justify-between px-4">
      <div className="text-center text-xl text-white font-bold">
        PATHFINDING VISUALIZER
      </div>
      <button
        className="bg-sky-500 text-white font-bold rounded-none px-2"
        onClick={handleClick}
      >
        VISUALIZE
      </button>
    </div>
  );
}

export default Header;
