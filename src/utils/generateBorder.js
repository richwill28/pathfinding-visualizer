import { MAX_ROW, MAX_COL } from "./constants/max";
import { STYLE_WALL_DARK, STYLE_WALL_LIGHT } from "./constants/style";
import isEqual from "./isEqual";
import sleep from "./sleep";

export default async function generateBorder(grid, startNode, endNode, isDark) {
  const d = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];

  let row = 0;
  let col = 0;
  for (let i = 0; i < 4; i++) {
    while (row >= 0 && row <= MAX_ROW - 1 && col >= 0 && col <= MAX_COL - 1) {
      if (
        !isEqual(grid[row][col], startNode) &&
        !isEqual(grid[row][col], endNode)
      ) {
        grid[row][col].isWall = true;

        document.getElementById(`${row}-${col}`).className =
          (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
        await sleep(8);
      }
      row += d[i].row;
      col += d[i].col;
    }
    row = row === MAX_ROW ? MAX_ROW - 1 : row === -1 ? 0 : row;
    col = col === MAX_COL ? MAX_COL - 1 : col === -1 ? 0 : col;
  }
}
