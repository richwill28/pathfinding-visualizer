import { MAX_ROW, MAX_COL } from "../../constants/max";
import isEqual from "../../isEqual";

// non-optimized implementation without using proper queue data structure
export default function bfs(grid, startNode, endNode) {
  const visitedNodes = [];

  const start = grid[startNode.row][startNode.col];
  start.distance = 0;
  const queueFromStart = [start];
  const isVisitedFromStart = initializeMatrix(false);
  const parentFromStart = initializeMatrix(null);

  const end = grid[endNode.row][endNode.col];
  end.distance = 0;
  const queueFromEnd = [end];
  const isVisitedFromEnd = initializeMatrix(false);
  const parentFromEnd = initializeMatrix(null);

  let lastVisitedNode;

  // BFS main routine
  while (queueFromStart.length > 0 && queueFromEnd.length > 0) {
    let node, neighbors;

    // start node perspective
    node = queueFromStart.shift();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    if (isVisitedFromEnd[node.row][node.col]) {
      lastVisitedNode = node;
      break;
    }
    node.isVisited = true;
    isVisitedFromStart[node.row][node.col] = true;
    visitedNodes.push(node);
    if (isEqual(node, endNode)) break; // finish

    // traverse neighbors
    neighbors = getNeighbors(grid, node);
    for (const neighbor of neighbors) {
      if (
        !isVisitedFromStart[neighbor.row][neighbor.col] &&
        !isInQueue(neighbor, queueFromStart)
      ) {
        neighbor.distance = node.distance + 1;
        parentFromStart[neighbor.row][neighbor.col] = node;
        queueFromStart.push(neighbor);
      }
    }

    // end node perspective
    node = queueFromEnd.shift();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    if (isVisitedFromStart[node.row][node.col]) {
      lastVisitedNode = node;
      break;
    }
    node.isVisited = true;
    isVisitedFromEnd[node.row][node.col] = true;
    visitedNodes.push(node);
    if (isEqual(node, startNode)) break; // finish

    // traverse neighbors
    neighbors = getNeighbors(grid, node);
    for (const neighbor of neighbors) {
      if (
        !isVisitedFromEnd[neighbor.row][neighbor.col] &&
        !isInQueue(neighbor, queueFromEnd)
      ) {
        neighbor.distance = node.distance + 1;
        parentFromEnd[neighbor.row][neighbor.col] = node;
        queueFromEnd.push(neighbor);
      }
    }
  }

  // Get shortest path
  const shortestPath = [];
  let node = lastVisitedNode;
  while (node !== null) {
    node.isPath = true;
    shortestPath.unshift(node);
    node = parentFromStart[node.row][node.col];
  }
  node = lastVisitedNode;
  node = parentFromEnd[node.row][node.col];
  while (node !== null) {
    node.isPath = true;
    shortestPath.push(node);
    node = parentFromEnd[node.row][node.col];
  }

  return { visitedNodes, shortestPath };
}

function getNeighbors(grid, node) {
  const { row, col } = node;
  const neighbors = [];
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (col < MAX_COL - 1) neighbors.push(grid[row][col + 1]); // right
  if (row < MAX_ROW - 1) neighbors.push(grid[row + 1][col]); // bottom
  return neighbors;
}

function isInQueue(node, queue) {
  for (const element of queue) {
    if (isEqual(node, element)) {
      return true;
    }
  }
  return false;
}

function initializeMatrix(value) {
  const matrix = [];
  for (let i = 0; i < MAX_ROW; i++) {
    const row = [];
    for (let j = 0; j < MAX_COL; j++) {
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}
