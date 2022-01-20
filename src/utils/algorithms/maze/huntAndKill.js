import { MAX_COL, MAX_ROW } from "../../constants/max";
import {
  STYLE_UNVISITED,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from "../../constants/style";
import isEqual from "../../isEqual";
import getRandomInt from "../../getRandomInt";
import sleep from "../../sleep";

export default async function huntAndKill(grid, startNode, endNode, isDark) {
  const isVisited = [];

  // generate walls
  for (const row of grid) {
    const isVisitedRow = [];
    for (const node of row) {
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        if (node.row % 2 === 0 || node.col % 2 === 0) {
          node.isWall = true;
        }

        await renderGrid(
          node.row,
          node.col,
          isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK,
          " animate-wall",
          0.1,
          startNode,
          endNode
        );
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

  const node = { row: 1, col: 1 };
  isVisited[node.row][node.col] = true;
  unvisitedCount--;

  // main routine
  while (unvisitedCount > 0) {
    const { isMazeComplete, updatedCount } = await randomWalk(
      grid,
      node,
      isVisited,
      unvisitedCount,
      startNode,
      endNode
    );
    unvisitedCount = updatedCount;
    if (!isMazeComplete) {
      const { row, col, updatedCount } = await hunt(
        grid,
        node,
        isVisited,
        unvisitedCount,
        startNode,
        endNode
      );
      node.row = row;
      node.col = col;
      unvisitedCount = updatedCount;
    }
  }
}

async function randomWalk(
  grid,
  node,
  isVisited,
  unvisitedCount,
  startNode,
  endNode
) {
  while (unvisitedCount > 0) {
    const hasUnvisitedNeighbor = findUnvisitedNeighbor(node, isVisited);
    if (!hasUnvisitedNeighbor) {
      return { isMazeComplete: false, updatedCount: unvisitedCount };
    }

    const direction = getRandomInt(0, 4);
    if (direction === 0) {
      // traverse left
      if (node.col > 2 && !isVisited[node.row][node.col - 2]) {
        isVisited[node.row][node.col - 2] = true;
        grid[node.row][node.col - 1].isWall = false;
        unvisitedCount--;
        node.col -= 2;

        await renderGrid(
          node.row,
          node.col + 1,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
        await renderGrid(
          node.row,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
      }
    } else if (direction === 1) {
      // traverse up
      if (node.row > 2 && !isVisited[node.row - 2][node.col]) {
        isVisited[node.row - 2][node.col] = true;
        grid[node.row - 1][node.col].isWall = false;
        unvisitedCount--;
        node.row -= 2;

        await renderGrid(
          node.row + 1,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
        await renderGrid(
          node.row,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
      }
    } else if (direction === 2) {
      // traverse right
      if (node.col < MAX_COL - 3 && !isVisited[node.row][node.col + 2]) {
        isVisited[node.row][node.col + 2] = true;
        grid[node.row][node.col + 1].isWall = false;
        unvisitedCount--;
        node.col += 2;

        await renderGrid(
          node.row,
          node.col - 1,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
        await renderGrid(
          node.row,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
      }
    } else if (direction === 3) {
      // traverse down
      if (node.row < MAX_ROW - 3 && !isVisited[node.row + 2][node.col]) {
        isVisited[node.row + 2][node.col] = true;
        grid[node.row + 1][node.col].isWall = false;
        unvisitedCount--;
        node.row += 2;

        await renderGrid(
          node.row - 1,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
        await renderGrid(
          node.row,
          node.col,
          STYLE_UNVISITED,
          "",
          15,
          startNode,
          endNode
        );
      }
    }
  }

  return { isMazeComplete: true, updatedCount: unvisitedCount };
}

async function hunt(grid, node, isVisited, unvisitedCount, startNode, endNode) {
  for (let i = 1; i < MAX_ROW; i += 2) {
    for (let j = 1; j < MAX_COL; j += 2) {
      if (!isVisited[i][j]) {
        if (isVisited[i][j - 2]) {
          isVisited[i][j] = true;
          grid[i][j - 1].isWall = false;
          unvisitedCount--;

          await renderGrid(
            i,
            j - 1,
            STYLE_UNVISITED,
            "",
            15,
            startNode,
            endNode
          );
          await renderGrid(i, j, STYLE_UNVISITED, "", 15, startNode, endNode);

          return { row: i, col: j, updatedCount: unvisitedCount };
        } else if (isVisited[i - 2][j]) {
          isVisited[i][j] = true;
          grid[i - 1][j].isWall = false;
          unvisitedCount--;

          await renderGrid(
            i - 1,
            j,
            STYLE_UNVISITED,
            "",
            15,
            startNode,
            endNode
          );
          await renderGrid(i, j, STYLE_UNVISITED, "", 15, startNode, endNode);

          return { row: i, col: j, updatedCount: unvisitedCount };
        } else if (isVisited[i][j + 2]) {
          isVisited[i][j] = true;
          grid[i][j + 1].isWall = false;
          unvisitedCount--;

          await renderGrid(
            i,
            j + 1,
            STYLE_UNVISITED,
            "",
            15,
            startNode,
            endNode
          );
          await renderGrid(i, j, STYLE_UNVISITED, "", 15, startNode, endNode);

          return { row: i, col: j, updatedCount: unvisitedCount };
        } else if (isVisited[i + 2][j]) {
          isVisited[i][j] = true;
          grid[i + 1][j].isWall = false;
          unvisitedCount--;

          await renderGrid(
            i + 1,
            j,
            STYLE_UNVISITED,
            "",
            15,
            startNode,
            endNode
          );
          await renderGrid(i, j, STYLE_UNVISITED, "", 15, startNode, endNode);

          return { row: i, col: j, updatedCount: unvisitedCount };
        }
      }
    }
  }
  return { row: node.row, col: node.col, updatedCount: unvisitedCount };
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

async function renderGrid(
  row,
  col,
  style,
  animation,
  delay,
  startNode,
  endNode
) {
  const node = { row: row, col: col };
  if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
    document.getElementById(`${node.row}-${node.col}`).className =
      style + animation;
    await sleep(delay);
  }
}
