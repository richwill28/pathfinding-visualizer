import isEqual from "../../isEqual";

export default function binaryTree(grid, startNode, endNode, walls) {
  // generate walls
  for (const row of grid) {
    for (const node of row) {
      if (node.row % 2 === 1 || node.col % 2 === 1) {
        if (!isEqual(node, startNode) && !isEqual(node, startNode)) {
          node.isWall = true;
        }
      }
    }
  }
}
