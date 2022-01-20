import { MAX_ROW, MAX_COL } from "./constants/max";
import { STYLE_WALL_DARK } from "./constants/style";
import isEqual from "./isEqual";
import sleep from "./sleep";

export default async function generateBorder(grid, startNode, endNode) {
  // top
  for (let i = 0; i < MAX_COL; i++) {
    if (!isEqual(grid[0][i], startNode) && !isEqual(grid[0][i], endNode)) {
      grid[0][i].isWall = true;

      document.getElementById(`${0}-${i}`).className =
        STYLE_WALL_DARK + " animate-wall";
      await sleep(8);
    }
  }

  // right
  for (let i = 1; i < MAX_ROW; i++) {
    if (
      !isEqual(grid[i][MAX_COL - 1], startNode) &&
      !isEqual(grid[i][MAX_COL - 1], endNode)
    ) {
      grid[i][MAX_COL - 1].isWall = true;

      document.getElementById(`${i}-${MAX_COL - 1}`).className =
        STYLE_WALL_DARK + " animate-wall";
      await sleep(8);
    }
  }

  // bottom
  for (let i = MAX_COL - 2; i >= 0; i--) {
    if (
      !isEqual(grid[MAX_ROW - 1][i], startNode) &&
      !isEqual(grid[MAX_ROW - 1][i], endNode)
    ) {
      grid[MAX_ROW - 1][i].isWall = true;

      document.getElementById(`${MAX_ROW - 1}-${i}`).className =
        STYLE_WALL_DARK + " animate-wall";
      await sleep(8);
    }
  }

  // left
  for (let i = MAX_ROW - 2; i >= 1; i--) {
    if (!isEqual(grid[i][0], startNode) && !isEqual(grid[i][0], endNode)) {
      grid[i][0].isWall = true;

      document.getElementById(`${i}-${0}`).className =
        STYLE_WALL_DARK + " animate-wall";
      await sleep(8);
    }
  }
}
