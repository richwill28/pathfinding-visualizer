import { STYLE_VISITED, STYLE_PATH } from "./constants/style";

export default function animate(visitedNodes, shortestPath) {
  for (const node of visitedNodes) {
    document.getElementById(`${node.row}-${node.col}`).className =
      STYLE_VISITED;
  }

  for (const node of shortestPath) {
    document.getElementById(`${node.row}-${node.col}`).className = STYLE_PATH;
  }
}
