import { MAX_ROW, MAX_COL } from "../../constants/variable";

// non-optimized implementation without using proper stack data structure
export default function bfs(grid, startNode, endNode) {
  const visitedNodes = [];

  // DFS main routine
  grid[startNode.row][startNode.col].distance = 0;
  const unvisitedNodes = [grid[startNode.row][startNode.col]];
  while (unvisitedNodes.length > 0) {
    const node = unvisitedNodes.pop();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    node.isVisited = true;
    visitedNodes.push(node);
    if (node.row === endNode.row && node.col === endNode.col) break; // finish

    // traverse neighbors
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      let isSkip = false; // prevent pushing the same node into the stack more than once
      for (const unvisitedNode of unvisitedNodes) {
        if (
          neighbor.row === unvisitedNode.row &&
          neighbor.col === unvisitedNode.col
        ) {
          isSkip = true;
        }
      }
      if (!isSkip) {
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
