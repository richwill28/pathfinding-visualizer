import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const INITIAL_START = { row: 9, col: 9 };
const INITIAL_END = { row: 29, col: 39 };

export default function App() {
  const [grid, setGrid] = useState([]);

  const [startNode, setStartNode] = useState(INITIAL_START);
  const [endNode, setEndNode] = useState(INITIAL_END);

  return (
    <div>
      <div className="transition duration-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full max-w-[1000px]">
          <div className="min-h-[80px]">
            <Header grid={grid} startNode={startNode} endNode={endNode} />
          </div>
          <div className="min-h-[600px]">
            <Body
              startNodeState={[startNode, setStartNode]}
              endNodeState={[endNode, setEndNode]}
              gridState={[grid, setGrid]}
            />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
