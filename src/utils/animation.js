import {
  STYLE_VISITED,
  STYLE_PATH,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from "./constants/style";
import { DELAY_VISIT, DELAY_PATH, DELAY_WALL } from "./constants/delay";

export function animatePath(visitedNodes, shortestPath) {
  for (let i = 1; i < visitedNodes.length - 1; i++) {
    setTimeout(() => {
      const node = visitedNodes[i];
      document.getElementById(`${node.row}-${node.col}`).className =
        STYLE_VISITED + " animate-visited";
    }, DELAY_VISIT * i);
  }

  setTimeout(() => {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          STYLE_PATH + " animate-path";
      }, DELAY_PATH * i);
    }
  }, DELAY_VISIT * (visitedNodes.length - 2));
}

export function animateWall(walls, isDark) {
  for (let i = 0; i < walls.length; i++) {
    setTimeout(() => {
      const node = walls[i];
      document.getElementById(`${node.row}-${node.col}`).className =
        (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
    }, DELAY_WALL * i);
  }
}
