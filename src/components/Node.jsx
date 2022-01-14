import {
  STYLE_START,
  STYLE_END,
  STYLE_WALL,
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
}) {
  const style = isStart
    ? STYLE_START
    : isEnd
    ? STYLE_END
    : isWall
    ? STYLE_WALL
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
