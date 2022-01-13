import {
  STYLE_NODE,
  STYLE_START,
  STYLE_END,
  STYLE_VISITED,
  STYLE_WALL,
} from "./style";

export const STATE_START = STYLE_NODE + " " + STYLE_START;
export const STATE_END = STYLE_NODE + " " + STYLE_END;
export const STATE_UNVISITED = STYLE_NODE;
export const STATE_VISITED = STYLE_NODE + " " + STYLE_VISITED;
export const STATE_WALL = STYLE_NODE + " " + STYLE_WALL;
