import { MAX_ROW, MAX_COL } from "../constants/variable";

export default function dijkstra(grid, startNode, endNode) {
  grid[startNode.row][startNode.col].distance = 0;
  const unvisitedNodes = getNodes(grid);
  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const node = unvisitedNodes.shift();
    if (node.isWall) continue;
    if (node.distance === Infinity) return;
    node.isVisited = true;
    if (node.row === endNode.row && node.col === endNode.col) return;
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
    }
  }
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
  return neighbors;
}
