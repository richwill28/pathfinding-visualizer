import {
  STYLE_START,
  STYLE_END,
  STYLE_WALL_LIGHT,
  STYLE_WALL_DARK,
  STYLE_UNVISITED,
  STYLE_VISITED,
} from "../utils/constants/style";

export default function Node({
  row,
  col,
  isStart,
  isEnd,
  isVisited,
  isWall,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseOut,
  isDark,
}) {
  const style = isStart
    ? STYLE_START
    : isEnd
    ? STYLE_END
    : isWall && isDark
    ? STYLE_WALL_LIGHT
    : isWall && !isDark
    ? STYLE_WALL_DARK
    : isVisited
    ? STYLE_VISITED
    : STYLE_UNVISITED;

  return (
    <div
      id={`${row}-${col}`}
      className={style}
      onMouseDown={() => onMouseDown(row, col, isStart, isEnd)}
      onMouseUp={() => onMouseUp()}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseOut={() => onMouseOut(row, col)}
    ></div>
  );
}
