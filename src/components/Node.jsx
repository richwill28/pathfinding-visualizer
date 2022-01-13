import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import {
  STATE_START,
  STATE_END,
  STATE_UNVISITED,
  STATE_VISITED,
  STATE_WALL,
} from "../utils/constants/state";

function Node({ index, mouseState, generateState, startState, endState }) {
  const [startNode, setStartNode] = startState;
  const [endNode, setEndNode] = endState;

  const [state, setState] = useState(STATE_UNVISITED);

  // Set initial position for start and end node
  useEffect(() => {
    if (isEqual(index, startNode)) {
      setState(STATE_START);
    } else if (isEqual(index, endNode)) {
      setState(STATE_END);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (generate === "START") {
        setStartNode(index);
      } else if (generate === "END") {
        setEndNode(index);
      }
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
      id={index.row + " " + index.col}
      className={state}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      setstate={setState}
    ></div>
  );
}

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

export default Node;
