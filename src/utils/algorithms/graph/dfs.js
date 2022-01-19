import { MAX_ROW, MAX_COL } from "../../constants/max";
import isEqual from "../../isEqual";

// non-optimized implementation without using proper stack data structure
export default function bfs(grid, startNode, endNode) {
  const visitedNodes = [];

  const root = grid[startNode.row][startNode.col];
  root.distance = 0;
  root.isVisited = true;

  // DFS main routine
  const unvisitedNodes = [root];
  while (unvisitedNodes.length > 0) {
    const node = unvisitedNodes.pop();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    node.isVisited = true;
    visitedNodes.push(node);
    if (isEqual(node, endNode)) break; // finish

    // traverse neighbors
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      if (!isInStack(neighbor, unvisitedNodes)) {
        neighbor.distance = node.distance + 1;
        neighbor.parent = node;
        unvisitedNodes.push(neighbor);
      }
    }
  }

  // Get shortest path
  const shortestPath = [];
  let node = grid[endNode.row][endNode.col];
  while (node !== null) {
    node.isPath = true;
    shortestPath.unshift(node);
    node = node.parent;
  }

  return { visitedNodes, shortestPath };
}

function getUnvisitedNeighbors(grid, node) {
  const { row, col } = node;
  const neighbors = [];
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (col < MAX_COL - 1) neighbors.push(grid[row][col + 1]); // right
  if (row < MAX_ROW - 1) neighbors.push(grid[row + 1][col]); // bottom
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function isInStack(node, queue) {
  for (const element of queue) {
    if (isEqual(node, element)) {
      return true;
    }
  }
  return false;
}
