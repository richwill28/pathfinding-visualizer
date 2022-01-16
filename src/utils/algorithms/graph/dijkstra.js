import { MAX_ROW, MAX_COL } from "../../constants/variable";

// Inefficient implementation without using priority queue
export default function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];

  // Dijkstra main routine
  grid[startNode.row][startNode.col].distance = 0;
  const unvisitedNodes = getNodes(grid);
  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const node = unvisitedNodes.shift();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    node.isVisited = true;
    visitedNodes.push(node);
    if (node.row === endNode.row && node.col === endNode.col) break; // finish
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.parent = node;
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
