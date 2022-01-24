import { MAX_COL, MAX_ROW } from "../../constants/max";
import {
  STYLE_BACKTRACK,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
  STYLE_UNVISITED,
} from "../../constants/style";
import isEqual from "../../isEqual";
import getRandomInt from "../../getRandomInt";
import sleep from "../../sleep";

export default async function recursiveBacktracker(
  grid,
  startNode,
  endNode,
  isDark
) {
  renderWall(startNode, endNode, isDark);
  await sleep(MAX_ROW * MAX_COL);

  const isVisited = [];

  for (const row of grid) {
    const isVisitedRow = [];
    for (const node of row) {
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        if (node.row % 2 === 0 || node.col % 2 === 0) {
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

  const node = { row: 1, col: 1 };
  isVisited[node.row][node.col] = true;
  unvisitedCount--;

  const stack = [node];

  // main routine
  while (unvisitedCount > 0) {
    const { isMazeComplete, updatedCount } = await randomWalk(
      grid,
      node,
      isVisited,
      unvisitedCount,
      stack,
      startNode,
      endNode
    );
    unvisitedCount = updatedCount;
    if (!isMazeComplete) {
      const { row, col } = await backtrack(
        isVisited,
        stack,
        startNode,
        endNode
      );
      node.row = row;
      node.col = col;
    }
  }

  while (stack.length > 0) {
    const top = stack.pop();

    await renderNode(
      top.row,
      top.col,
      STYLE_UNVISITED,
      "",
      12,
      startNode,
      endNode
    );
  }
}

async function randomWalk(
  grid,
  node,
  isVisited,
  unvisitedCount,
  stack,
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

        stack.push({ row: node.row, col: node.col + 1 });
        stack.push({ row: node.row, col: node.col });

        await renderNode(
          node.row,
          node.col + 1,
          STYLE_BACKTRACK,
          "",
          8,
          startNode,
          endNode
        );
        await renderNode(
          node.row,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
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

        stack.push({ row: node.row + 1, col: node.col });
        stack.push({ row: node.row, col: node.col });

        await renderNode(
          node.row + 1,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
          startNode,
          endNode
        );
        await renderNode(
          node.row,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
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

        stack.push({ row: node.row, col: node.col - 1 });
        stack.push({ row: node.row, col: node.col });

        await renderNode(
          node.row,
          node.col - 1,
          STYLE_BACKTRACK,
          "",
          8,
          startNode,
          endNode
        );
        await renderNode(
          node.row,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
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

        stack.push({ row: node.row - 1, col: node.col });
        stack.push({ row: node.row, col: node.col });

        await renderNode(
          node.row - 1,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
          startNode,
          endNode
        );
        await renderNode(
          node.row,
          node.col,
          STYLE_BACKTRACK,
          "",
          8,
          startNode,
          endNode
        );
      }
    }
  }

  return { isMazeComplete: true, updatedCount: unvisitedCount };
}

async function backtrack(isVisited, stack, startNode, endNode) {
  let node = stack[stack.length - 1];
  let hasUnvisitedNeighbor = findUnvisitedNeighbor(node, isVisited);
  while (!hasUnvisitedNeighbor) {
    node = stack.pop();
    const wall = stack.pop();

    await renderNode(
      node.row,
      node.col,
      STYLE_UNVISITED,
      "",
      12,
      startNode,
      endNode
    );
    await renderNode(
      wall.row,
      wall.col,
      STYLE_UNVISITED,
      "",
      12,
      startNode,
      endNode
    );

    node = stack[stack.length - 1];
    hasUnvisitedNeighbor = findUnvisitedNeighbor(node, isVisited);
  }

  return { row: node.row, col: node.col };
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

async function renderNode(
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

function renderWall(startNode, endNode, isDark) {
  const walls = [];

  for (let i = 0; i < MAX_COL; i++) {
    let row = 0;
    let col = i;
    while (row >= 0 && row <= MAX_ROW - 1 && col >= 0 && col <= MAX_COL - 1) {
      const node = { row: row, col: col };
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        walls.push(node);
      }
      row++;
      col--;
    }
  }

  for (let i = 1; i < MAX_ROW; i++) {
    let row = i;
    let col = MAX_COL - 1;
    while (row >= 0 && row <= MAX_ROW - 1 && col >= 0 && col <= MAX_COL - 1) {
      const node = { row: row, col: col };
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        walls.push(node);
      }
      row++;
      col--;
    }
  }

  let delay = 0;
  for (const wall of walls) {
    setTimeout(() => {
      document.getElementById(`${wall.row}-${wall.col}`).className =
        (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
    }, delay++);
  }
}
