import { MAX_ROW } from "../constants";

function Cell({ rowIndex, colIndex }) {
  let style = "w-[20px] h-[20px] border-t border-r border-sky-500";
  style += colIndex === 0 ? " border-l" : "";
  style += rowIndex === MAX_ROW - 1 ? " border-b" : "";

  return <canvas id={`(${rowIndex}, ${colIndex})`} className={style} />;
}

export default Cell;
