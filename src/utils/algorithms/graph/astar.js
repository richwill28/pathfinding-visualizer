import { MAX_ROW, MAX_COL } from "../../constants/variable";

export default function astar(grid, startNode, endNode) {
  const visitedNodes = [];

  // Get shortest path
  const shortestPath = [];

  return { visitedNodes, shortestPath };
}

function getNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function getUnvisitedNeighbors(grid, node) {
  const { row, col } = node;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < MAX_ROW - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < MAX_COL - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
