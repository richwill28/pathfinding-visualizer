import isEqual from "../../isEqual";
import { STYLE_WALL_DARK, STYLE_WALL_LIGHT } from "../../constants/style";
import getRandomInt from "../../getRandomInt";
import sleep from "../../sleep";

export default async function recursiveDivision(
  grid,
  startNode,
  endNode,
  row,
  col,
  height,
  width,
  isDark
) {
  if (height <= 1 || width <= 1) {
    return;
  }

  if (height > width) {
    await divideHorizontally(
      grid,
      startNode,
      endNode,
      row,
      col,
      height,
      width,
      isDark
    );
  } else {
    await divideVertically(
      grid,
      startNode,
      endNode,
      row,
      col,
      height,
      width,
      isDark
    );
  }
}

async function divideHorizontally(
  grid,
  startNode,
  endNode,
  row,
  col,
  height,
  width,
  isDark
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

        document.getElementById(`${generateWallAt}-${col + i}`).className =
          (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
        await sleep(10);
      }
    }
  }

  await recursiveDivision(
    grid,
    startNode,
    endNode,
    row,
    col,
    (generateWallAt - row + 1) / 2,
    width,
    isDark
  );
  await recursiveDivision(
    grid,
    startNode,
    endNode,
    generateWallAt + 1,
    col,
    height - (generateWallAt - row + 1) / 2,
    width,
    isDark
  );
}

async function divideVertically(
  grid,
  startNode,
  endNode,
  row,
  col,
  height,
  width,
  isDark
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

        document.getElementById(`${row + i}-${generateWallAt}`).className =
          (isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK) + " animate-wall";
        await sleep(10);
      }
    }
  }

  await recursiveDivision(
    grid,
    startNode,
    endNode,
    row,
    col,
    height,
    (generateWallAt - col + 1) / 2,
    isDark
  );
  await recursiveDivision(
    grid,
    startNode,
    endNode,
    row,
    generateWallAt + 1,
    height,
    width - (generateWallAt - col + 1) / 2,
    isDark
  );
}
