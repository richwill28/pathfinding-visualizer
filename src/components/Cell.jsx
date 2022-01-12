import isEqual from "lodash/isEqual";
import { MAX_ROW } from "../constants/variable";
import { ICON_START } from "../constants/icon";
import { ICON_END } from "../constants/icon";

function Cell({ index, startNode, endNode }) {
  let style =
    "w-[20px] h-[20px] object-scale-down border-t border-r border-sky-500";
  style += index.col === 0 ? " border-l" : "";
  style += index.row === MAX_ROW - 1 ? " border-b" : "";

  return (
    <div className={style}>
      {isEqual(index, startNode)
        ? ICON_START
        : isEqual(index, endNode)
        ? ICON_END
        : ""}
    </div>
  );
}

export default Cell;
