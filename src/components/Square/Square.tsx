import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSquarePosition } from "../../redux/slices/globalSlice";

import styles from "./Square.module.scss";

export type Props = {
  id: number;
};

const Square = ({ id }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const dispatchCurrentPosition = (
    offsetX: number = 0,
    offsetY: number = 0
  ) => {
    const client = ref.current?.getBoundingClientRect();

    client &&
      dispatch(
        setSquarePosition({
          id,
          position: {
            top: client.top + offsetX,
            right: client.right + offsetY,
            bottom: client.bottom + offsetX,
            left: client.left + offsetY,
          },
        })
      );
  };

  useEffect(() => {
    dispatchCurrentPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.Square}></div>;
};

export default Square;
