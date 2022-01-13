import Heap from "heap-js";
import {
  STATE_START,
  STATE_END,
  STATE_UNVISITED,
  STATE_VISITED,
  STATE_WALL,
} from "../constants/state";

function Dijkstra(grid, setGrid, startNode, endNode) {
  // const comparator = (a, b) => ;
  // const priorityQueue
  console.log(
    `s: (${startNode.row}, ${startNode.col}), e: (${endNode.row}, ${endNode.col})`
  );
  document
    .getElementById(startNode.row + 1 + " " + startNode.col)
    .setstate(STATE_VISITED);
  return null;
}

export default Dijkstra;
