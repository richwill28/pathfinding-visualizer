import { STYLE_VISITED, STYLE_PATH } from "./constants/style";

export default function visualize(visitedNodes, shortestPath) {
  for (let i = 1; i < visitedNodes.length - 1; i++) {
    const node = visitedNodes[i];
    document.getElementById(`${node.row}-${node.col}`).className =
      STYLE_VISITED;
  }

  for (let i = 1; i < shortestPath.length - 1; i++) {
    const node = shortestPath[i];
    document.getElementById(`${node.row}-${node.col}`).className = STYLE_PATH;
  }
}
