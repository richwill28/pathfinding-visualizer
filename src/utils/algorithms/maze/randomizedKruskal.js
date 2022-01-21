import UnionFind from "../../data-structures/UnionFind";
import { MAX_COL, MAX_ROW } from "../../constants/max";
import {
  STYLE_UNVISITED,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from "../../constants/style";
import isEqual from "../../isEqual";
import sleep from "../../sleep";
import dursternfeld from "../shuffle/durstenfeld";

export default async function randomizedKruskal(
  grid,
  startNode,
  endNode,
  isDark
) {
  renderWall(startNode, endNode, isDark);
  await sleep(MAX_ROW * MAX_COL);

  for (const row of grid) {
    for (const node of row) {
      if (!isEqual(node, startNode) && !isEqual(node, endNode)) {
        if (node.row % 2 === 0 || node.col % 2 === 0) {
          node.isWall = true;
        }
      }
    }
  }

  const walls = [];
  for (let row = 1; row < MAX_ROW - 1; row++) {
    for (let col = 1; col < MAX_COL - 1; col++) {
      if ((row % 2 === 0) !== (col % 2 === 0)) {
        const wall = { row: row, col: col };
        walls.push(wall);
      }
    }
  }
  dursternfeld(walls); // shuffle walls

  const unionFind = new UnionFind(MAX_ROW * MAX_COL);
  for (const wall of walls) {
    if (unionFind.getNumOfDisjointSets === 1) {
      break;
    }

    const [node1, node2] = getNeighbors(wall);
    if (!unionFind.isSameSet(mapToIndex(node1), mapToIndex(node2))) {
      grid[wall.row][wall.col].isWall = false;

      document.getElementById(`${wall.row}-${wall.col}`).className =
        STYLE_UNVISITED;
      await sleep(10);

      await connectNodes(node1, node2, unionFind, grid, startNode, endNode);
    }
  }
}

function getNeighbors(wall) {
  if (wall.col % 2 === 0) {
    // left and right
    return [
      { row: wall.row, col: wall.col - 1 },
      { row: wall.row, col: wall.col + 1 },
    ];
  } else {
    // top and bottom
    return [
      { row: wall.row - 1, col: wall.col },
      { row: wall.row + 1, col: wall.col },
    ];
  }
}

async function connectNodes(node1, node2, unionFind, grid, startNode, endNode) {
  unionFind.unionSet(mapToIndex(node1), mapToIndex(node2));
  grid[node1.row][node1.col].isWall = false;
  grid[node2.row][node2.col].isWall = false;

  if (!isEqual(node1, startNode) && !isEqual(node1, endNode)) {
    document.getElementById(`${node1.row}-${node1.col}`).className =
      STYLE_UNVISITED;
  }
  if (!isEqual(node2, startNode) && !isEqual(node2, endNode)) {
    document.getElementById(`${node2.row}-${node2.col}`).className =
      STYLE_UNVISITED;
  }
  await sleep(10);
}

function mapToIndex(node) {
  return MAX_COL * node.row + node.col;
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
