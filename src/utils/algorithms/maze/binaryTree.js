import { MAX_ROW, MAX_COL } from "../../constants/max";
import { STYLE_UNVISITED, STYLE_WALL_DARK } from "../../constants/style";
import isEqual from "../../isEqual";
import getRandomInt from "../../getRandomInt";
import sleep from "../../sleep";

export default async function binaryTree(grid, startNode, endNode) {
  // generate walls
  for (const row of grid) {
    for (const node of row) {
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
          node.isWall = true;

          document.getElementById(`${node.row}-${node.col}`).className =
            STYLE_WALL_DARK + " animate-wall";
          await sleep(0.2);
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
