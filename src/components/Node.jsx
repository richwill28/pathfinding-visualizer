import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import { MAX_ROW } from "../constants/variable";
import {
  STYLE_NODE,
  STYLE_START,
  STYLE_END,
  STYLE_VISITED,
  STYLE_WALL,
} from "../constants/style";

const STATE_START = STYLE_NODE + " " + STYLE_START;
const STATE_END = STYLE_NODE + " " + STYLE_END;
const STATE_UNVISITED = STYLE_NODE;
const STATE_VISITED = STYLE_NODE + " " + STYLE_VISITED;
const STATE_WALL = STYLE_NODE + " " + STYLE_WALL;

const INITIAL_START = { row: 9, col: 9 };
const INITIAL_END = { row: 29, col: 39 };

function setNode(generate, state, setState) {
  if (generate === "WALL") {
    if (state !== STATE_START && state !== STATE_END) {
      setState(STATE_WALL);
    }
  } else if (generate === "START") {
    if (state !== STATE_END) {
      setState(STATE_START);
    }
  } else if (generate === "END") {
    if (state !== STATE_START) {
      setState(STATE_END);
    }
  }
}

function Node({ index, startState, endState, mouseState, generateState }) {
  const [state, setState] = useState(STATE_UNVISITED);

  // Add additional style for nodes in the first column or last row
  useEffect(() => {
    let additonalStyle = "";
    additonalStyle += index.col === 0 ? " border-l" : "";
    additonalStyle += index.row === MAX_ROW - 1 ? " border-b" : "";
    setState((prevStyle) => prevStyle + additonalStyle);
  }, []);

  // Set initial position for start and end node
  useEffect(() => {
    if (isEqual(index, INITIAL_START)) {
      setState(STATE_START);
    } else if (isEqual(index, INITIAL_END)) {
      setState(STATE_END);
    }
  }, []);

  const [isMouseDown, setIsMouseDown] = mouseState;

  const [generate, setGenerate] = generateState;

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    if (state === STATE_START) {
      setGenerate("START");
    } else if (state === STATE_END) {
      setGenerate("END");
    }
    setNode(generate, state, setState);
  };

  const handleMouseUp = (event) => {
    setIsMouseDown(false);
    setGenerate("WALL");
  };

  const handleMouseOver = (event) => {
    if (isMouseDown) {
      setNode(generate, state, setState);
    }
  };

  const handleMouseOut = (event) => {
    if (generate === "START") {
      if (state !== STATE_END) {
        setState(STATE_UNVISITED);
      }
    } else if (generate === "END") {
      if (state !== STATE_START) {
        setState(STATE_UNVISITED);
      }
    }
  };

  return (
    <div
      className={state}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    ></div>
  );
}

export default Node;
