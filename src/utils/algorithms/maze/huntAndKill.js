import { MAX_COL, MAX_ROW } from "../../constants/max";
import isEqual from "../../isEqual";

export default function huntAndKill(grid, startNode, endNode, walls) {
  const isVisited = [];

  // generate walls
  for (const row of grid) {
    const isVisitedRow = [];
    for (const node of row) {
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
          node.isWall = true;
        }
      }
      isVisitedRow.push(false);
    }
    isVisited.push(isVisitedRow);
  }

  let unvisitedCount = 0;
  for (let i = 1; i < MAX_ROW; i += 2) {
    for (let j = 1; j < MAX_COL; j += 2) {
      unvisitedCount++;
    }
  }

  // main routine
  const node = { row: 1, col: 1 };
  isVisited[node.row][node.col] = true;
  unvisitedCount--;
  while (unvisitedCount > 0) {
    const { isMazeCompleted, updatedCount } = randomWalk(
      grid,
      node,
      isVisited,
      unvisitedCount
    );
    unvisitedCount = updatedCount;
    if (!isMazeCompleted) {
      const { row, col, updatedCount } = hunt(
        grid,
        node,
        isVisited,
        unvisitedCount
      );
      node.row = row;
      node.col = col;
      unvisitedCount = updatedCount;
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

function randomWalk(grid, node, isVisited, unvisitedCount) {
  while (unvisitedCount > 0) {
    const hasUnvisitedNeighbor = findUnvisitedNeighbor(node, isVisited);
    if (!hasUnvisitedNeighbor) {
      return { isMazeCompleted: false, updatedCount: unvisitedCount };
    }

    const direction = getRandomInt(0, 4);
    if (direction === 0) {
      // traverse left
      if (node.col > 2 && !isVisited[node.row][node.col - 2]) {
        isVisited[node.row][node.col - 2] = true;
        grid[node.row][node.col - 1].isWall = false;
        unvisitedCount--;
        node.col -= 2;
      }
    } else if (direction === 1) {
      // traverse up
      if (node.row > 2 && !isVisited[node.row - 2][node.col]) {
        isVisited[node.row - 2][node.col] = true;
        grid[node.row - 1][node.col].isWall = false;
        unvisitedCount--;
        node.row -= 2;
      }
    } else if (direction === 2) {
      // traverse right
      if (node.col < MAX_COL - 3 && !isVisited[node.row][node.col + 2]) {
        isVisited[node.row][node.col + 2] = true;
        grid[node.row][node.col + 1].isWall = false;
        unvisitedCount--;
        node.col += 2;
      }
    } else if (direction === 3) {
      // traverse down
      if (node.row < MAX_ROW - 3 && !isVisited[node.row + 2][node.col]) {
        isVisited[node.row + 2][node.col] = true;
        grid[node.row + 1][node.col].isWall = false;
        unvisitedCount--;
        node.row += 2;
      }
    }
  }

  return { isMazeCompleted: true, updatedCount: unvisitedCount };
}

function hunt(grid, node, isVisited, unvisitedCount) {
  let row = node.row;
  let col = node.col;
  for (let i = 1; i < MAX_ROW; i += 2) {
    for (let j = 1; j < MAX_COL; j += 2) {
      if (!isVisited[i][j]) {
        if (isVisited[i][j - 2]) {
          isVisited[i][j] = true;
          grid[i][j - 1].isWall = false;
          unvisitedCount--;
          row = i;
          col = j - 2;
          return { row: row, col: col, updatedCount: unvisitedCount };
        } else if (isVisited[i - 2][j]) {
          isVisited[i][j] = true;
          grid[i - 1][j].isWall = false;
          unvisitedCount--;
          row = i - 2;
          col = j;
          return { row: row, col: col, updatedCount: unvisitedCount };
        } else if (isVisited[i][j + 2]) {
          isVisited[i][j] = true;
          grid[i][j + 1].isWall = false;
          unvisitedCount--;
          row = i;
          col = j + 2;
          return { row: row, col: col, updatedCount: unvisitedCount };
        } else if (isVisited[i + 2][j]) {
          isVisited[i][j] = true;
          grid[i + 1][j].isWall = false;
          unvisitedCount--;
          row = i + 2;
          col = j;
          return { row: row, col: col, updatedCount: unvisitedCount };
        }
      }
    }
  }
  return { row: row, col: col, updatedCount: unvisitedCount };
}

function findUnvisitedNeighbor(node, isVisited) {
  if (node.col > 2 && !isVisited[node.row][node.col - 2]) {
    return true;
  } else if (node.row > 2 && !isVisited[node.row - 2][node.col]) {
    return true;
  } else if (node.col < MAX_COL - 3 && !isVisited[node.row][node.col + 2]) {
    return true;
  } else if (node.row < MAX_ROW - 3 && !isVisited[node.row + 2][node.col]) {
    return true;
  }
  return false;
}

// minimum is inclusive and maximum is exclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
