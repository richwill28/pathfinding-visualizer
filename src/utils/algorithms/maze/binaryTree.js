import { MAX_ROW, MAX_COL } from "../../constants/max";
import {
  STYLE_UNVISITED,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from "../../constants/style";
import isEqual from "../../isEqual";
import getRandomInt from "../../getRandomInt";
import sleep from "../../sleep";

export default async function binaryTree(grid, startNode, endNode, isDark) {
  renderWall(startNode, endNode, isDark);
  await sleep(MAX_ROW * MAX_COL);

  for (const row of grid) {
    for (const node of row) {
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
          node.isWall = true;
        }
      }
    }
  }

  // remove walls
  for (let row = 1; row < MAX_ROW; row += 2) {
    for (let col = 1; col < MAX_COL; col += 2) {
      if (row === MAX_ROW - 2 && col === MAX_COL - 2) {
        continue;
      } else if (row === MAX_ROW - 2) {
        await removeWall(grid, row, col, 1); // remove right wall
      } else if (col === MAX_COL - 2) {
        await removeWall(grid, row, col, 0); // remove bottom wall
      } else {
        await removeWall(grid, row, col, getRandomInt(0, 2));
      }
    }
  }
}

async function removeWall(grid, row, col, isRight) {
  if (isRight) {
    grid[row][col + 1].isWall = false;

    document.getElementById(`${row}-${col + 1}`).className = STYLE_UNVISITED;
    await sleep(20);
  } else {
    grid[row + 1][col].isWall = false;

    document.getElementById(`${row + 1}-${col}`).className = STYLE_UNVISITED;
    await sleep(20);
  }
}

function renderWall(startNode, endNode, isDark) {
  const DELAY = 5;
  for (let row = 0; row < MAX_ROW; row++) {
    setTimeout(() => {
      for (let col = 0; col < MAX_COL; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          const node = { row: row, col: col };
          if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
            setTimeout(() => {
              document.getElementById(`${node.row}-${node.col}`).className =
                (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
            }, DELAY * col);
          }
        }
      }
    }, DELAY * (MAX_COL / 2) * row);
  }
}
