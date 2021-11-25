import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { setSquareInitialPosition } from "../../redux/slices/globalSlice";
import { RootState } from "../../redux/store";

import styles from "./Square.module.scss";

export type Props = {
  id: number;
};

const Square = ({ id }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [initialPosition, translatedPosition, isSelected] = useSelector(
    (state: RootState) => {
      // console.log(state);

      return [
        state.global.squareInitialPositions[id],
        state.global.squareTranslatedPositions[id],
        state.global.translation.square === id,
      ];
    }
  );

  useEffect(() => {
    const client = ref.current?.getBoundingClientRect();

    client &&
      dispatch(
        setSquareInitialPosition({
          id,
          position: {
            top: client.top,
            right: client.right,
            bottom: client.bottom,
            left: client.left,
          },
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classnames(styles.Square, { isSelected })}
      ref={ref}
      style={{
        transform: `translate(${
          translatedPosition?.left - initialPosition?.left
        }px, ${translatedPosition?.top - initialPosition?.top}px)`,
      }}
    ></div>
  );
};

export default Square;
