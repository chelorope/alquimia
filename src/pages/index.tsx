import type { NextPage } from "next";
import { SyntheticEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMousePosition } from "../redux/slices/globalSlice";

import Canvas from "../components/Canvas/Canvas";
import SideBar from "../components/SideBar/SideBar";
import Square from "../components/Square/Square";

import styles from "../styles/Home.module.scss";

const SQUARES_AMOUNT = 6;
const SQUARES_ARRAY = Array.from(Array(SQUARES_AMOUNT).keys());

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const handleMouseMove = (event: MouseEvent) => {
    dispatch(setMousePosition({ x: event.clientX, y: event.clientY }));
  };

  const handleMouseDownEvent = () => {
    dispatch(setMousePosition({ down: true }));
  };

  const handleMouseUpEvent = () => {
    dispatch(setMousePosition({ down: false }));
  };

  return (
    <div
      className={styles.main}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDownEvent}
      onMouseUp={handleMouseUpEvent}
    >
      <SideBar>
        {SQUARES_ARRAY.map((_, index) => (
          <Square key={index} id={index} />
        ))}
      </SideBar>
      <Canvas />
    </div>
  );
};

export default Home;
