import { MAX_ROW, MAX_COL } from "../../constants/max";
import isEqual from "../../isEqual";

// non-optimized implementation without using proper priority queue data structure
export default function astar(grid, startNode, endNode) {
  const visitedNodes = [];

  const hcost = initializeHcost(grid, endNode);
  const fcost = initializeFcost();

  const root = grid[startNode.row][startNode.col];
  root.distance = 0;
  fcost[root.row][root.col] = root.distance + hcost[root.row][root.col];
  root.isVisited = true;

  // A* main routine
  const unvisitedNodes = [root];
  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => {
      if (fcost[a.row][a.col] === fcost[b.row][b.col]) {
        // tie-breaker
        // return the square of euclidean distance so the result is
        // bias towards the path that lies along the straight line
        // path from the current node to the end node
        return (
          (a.row - endNode.row) ** 2 +
          (a.col - endNode.col) ** 2 -
          ((b.row - endNode.row) ** 2 + (b.col - endNode.col) ** 2)
        );
      } else {
        return fcost[a.row][a.col] - fcost[b.row][b.col];
      }
    }); // node with smaller fcost has higher priority

    const node = unvisitedNodes.shift();
    if (node.isWall) continue; // skip wall
    if (node.distance === Infinity) break; // trapped
    node.isVisited = true;
    visitedNodes.push(node);
    if (isEqual(node, endNode)) break; // finish

    // traverse neighbors
    const neighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of neighbors) {
      const distanceToNeighbor = node.distance + 1;
      if (distanceToNeighbor < neighbor.distance) {
        removeFromQueue(neighbor, unvisitedNodes);
        neighbor.distance = distanceToNeighbor;
        fcost[neighbor.row][neighbor.col] =
          neighbor.distance + hcost[neighbor.row][neighbor.col];
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

function removeFromQueue(node, queue) {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(queue[i], node)) {
      queue = queue.splice(i, 1);
      break;
    }
  }
}

function initializeHcost(grid, endNode) {
  const hcost = [];
  for (let i = 0; i < MAX_ROW; i++) {
    const row = [];
    for (let j = 0; j < MAX_COL; j++) {
      row.push(getHeuristic(grid[i][j], endNode));
    }
    hcost.push(row);
  }
  return hcost;
}

// reference: https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function getHeuristic(a, b) {
  // manhattan distance implementation
  const D = 1;
  const drow = Math.abs(a.row - b.row);
  const dcol = Math.abs(a.col - b.col);
  return D * (drow + dcol);
}

function initializeFcost() {
  const fcost = [];
  for (let i = 0; i < MAX_ROW; i++) {
    const row = [];
    for (let j = 0; j < MAX_COL; j++) {
      row.push(Infinity);
    }
    fcost.push(row);
  }
  return fcost;
}
