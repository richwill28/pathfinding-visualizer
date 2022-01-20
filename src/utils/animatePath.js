import { STYLE_VISITED, STYLE_PATH } from "./constants/style";

export default function animatePath(visitedNodes, shortestPath) {
  for (let i = 1; i < visitedNodes.length - 1; i++) {
    setTimeout(() => {
      const node = visitedNodes[i];
      document.getElementById(`${node.row}-${node.col}`).className =
        STYLE_VISITED + " animate-visited";
    }, 10 * i);
  }

  setTimeout(() => {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          STYLE_PATH + " animate-path";
      }, 40 * i);
    }
  }, 10 * (visitedNodes.length - 2));
}
