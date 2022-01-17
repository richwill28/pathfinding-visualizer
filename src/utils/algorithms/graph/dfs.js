import { MAX_ROW, MAX_COL } from "../../constants/max";

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
    visitedNodes.push(node);
    if (node.row === endNode.row && node.col === endNode.col) break; // finish

    // traverse neighbors
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.isVisited = true;
      neighbor.parent = node;
      unvisitedNodes.push(neighbor);
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
