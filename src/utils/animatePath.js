import { STYLE_VISITED, STYLE_PATH } from "./constants/style";
import isEqual from "./isEqual";

export default function animatePath(
  visitedNodes,
  shortestPath,
  startNode,
  endNode
) {
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      const node = visitedNodes[i];
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        document.getElementById(`${node.row}-${node.col}`).className =
          STYLE_VISITED + " animate-visited";
      }
    }, 8 * i);
  }

  setTimeout(() => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
          document.getElementById(`${node.row}-${node.col}`).className =
            STYLE_PATH + " animate-path";
        }
      }, 30 * i);
    }
  }, 8 * visitedNodes.length);
}
