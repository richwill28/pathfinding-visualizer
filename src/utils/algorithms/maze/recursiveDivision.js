import isEqual from "../../isEqual";

export default function recursiveDivision(
  grid,
  startNode,
  endNode,
  walls,
  row,
  col,
  height,
  width
) {
  if (height <= 1 || width <= 1) {
    return;
  }

  if (height > width) {
    divideHorizontally(
      grid,
      startNode,
      endNode,
      walls,
      row,
      col,
      height,
      width
    );
  } else {
    divideVertically(grid, startNode, endNode, walls, row, col, height, width);
  }
}

function divideHorizontally(
  grid,
  startNode,
  endNode,
  walls,
  row,
  col,
  height,
  width
) {
  const generateWallAt = row + getRandomInt(0, height - 1) * 2 + 1;
  const generatePassageAt = col + getRandomInt(0, width) * 2;

  for (let i = 0; i < 2 * width - 1; i++) {
    if (generatePassageAt !== col + i) {
      if (
        !isEqual(grid[generateWallAt][col + i], startNode) &&
        !isEqual(grid[generateWallAt][col + i], endNode)
      ) {
        grid[generateWallAt][col + i].isWall = true;
        walls.push(grid[generateWallAt][col + i]);
      }
    }
  }

  recursiveDivision(
    grid,
    startNode,
    endNode,
    walls,
    row,
    col,
    (generateWallAt - row + 1) / 2,
    width
  );
  recursiveDivision(
    grid,
    startNode,
    endNode,
    walls,
    generateWallAt + 1,
    col,
    height - (generateWallAt - row + 1) / 2,
    width
  );
}

function divideVertically(
  grid,
  startNode,
  endNode,
  walls,
  row,
  col,
  height,
  width
) {
  const generateWallAt = col + getRandomInt(0, width - 1) * 2 + 1;
  const generatePassageAt = row + getRandomInt(0, height) * 2;

  for (let i = 0; i < 2 * height - 1; i++) {
    if (generatePassageAt !== row + i) {
      if (
        !isEqual(grid[row + i][generateWallAt], startNode) &&
        !isEqual(grid[row + i][generateWallAt], endNode)
      ) {
        grid[row + i][generateWallAt].isWall = true;
        walls.push(grid[row + i][generateWallAt]);
      }
    }
  }

  recursiveDivision(
    grid,
    startNode,
    endNode,
    walls,
    row,
    col,
    height,
    (generateWallAt - col + 1) / 2
  );
  recursiveDivision(
    grid,
    startNode,
    endNode,
    walls,
    row,
    generateWallAt + 1,
    height,
    width - (generateWallAt - col + 1) / 2
  );
}

// minimum is inclusive and maximum is exclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
