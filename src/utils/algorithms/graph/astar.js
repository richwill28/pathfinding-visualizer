import { MAX_ROW, MAX_COL } from "../../constants/max";
import isEqual from "../../isEqual";

// non-optimized implementation without using proper priority queue data structure
export default function astar(grid, startNode, endNode) {
  const visitedNodes = [];

  const heuristicDistance = initializeHeuristicDistance(grid, endNode);

  const root = grid[startNode.row][startNode.col];
  root.distance = 0;
  root.isVisited = true;

  // A* main routine
  const unvisitedNodes = [root];
  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort(
      (a, b) =>
        a.distance +
        heuristicDistance[a.row][a.col] -
        (b.distance + heuristicDistance[b.row][b.col])
    ); // node with smaller (distance + heuristic) has higher priority
    const node = unvisitedNodes.shift();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    node.isVisited = true;
    visitedNodes.push(node);
    if (isEqual(node, endNode)) break; // finish

    // traverse neighbors
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      if (!isInQueue(neighbor, unvisitedNodes)) {
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

function isInQueue(node, queue) {
  for (const element of queue) {
    if (isEqual(node, element)) {
      return true;
    }
  }
  return false;
}

function initializeHeuristicDistance(grid, endNode) {
  const heuristicDistance = [];
  for (let i = 0; i < MAX_ROW; i++) {
    const row = [];
    for (let j = 0; j < MAX_COL; j++) {
      row.push(getHeuristicDistance(grid[i][j], endNode));
    }
    heuristicDistance.push(row);
  }
  return heuristicDistance;
}

// reference: https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function getHeuristicDistance(a, b) {
  // manhattan distance implementation
  const D = 1.2;
  const drow = Math.abs(a.row - b.row);
  const dcol = Math.abs(a.col - b.col);
  return D * (drow + dcol);
}
