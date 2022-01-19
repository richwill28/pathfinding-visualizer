import { MAX_ROW, MAX_COL } from "../../constants/max";
import isEqual from "../../isEqual";

export default function binaryTree(grid, startNode, endNode, walls) {
  // generate walls
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
        removeWall(grid, row, col, 1); // remove right wall
      } else if (col === MAX_COL - 2) {
        removeWall(grid, row, col, 0); // remove bottom wall
      } else {
        removeWall(grid, row, col, getRandomInt(0, 2));
      }
    }
  }

  for (const row of grid) {
    for (const node of row) {
      if (node.isWall) {
        walls.push(node);
      }
    }
  }
}

function removeWall(grid, row, col, isRight) {
  if (isRight) {
    grid[row][col + 1].isWall = false;
  } else {
    grid[row + 1][col].isWall = false;
  }
}

// minimum is inclusive and maximum is exclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
