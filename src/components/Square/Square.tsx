import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import {
  setMouseDown,
  setSquareInitialPosition,
} from "../../redux/slices/globalSlice";
import { RootState } from "../../redux/store";

import styles from "./Square.module.scss";

export type Props = {
  id: number;
};

const Square = ({ id }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { initialPosition, translatedPositions, selected } = useSelector(
    ({
      squareInitialPositions,
      squareTranslatedPositions,
      translation,
    }: RootState) => {
      return {
        initialPosition: squareInitialPositions[id],
        translatedPositions: squareTranslatedPositions[id],
        selected: translation.square[0] === id && translation.square[1],
      };
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
      className={styles.Square}
      ref={ref}
      onMouseDown={() => dispatch(setMouseDown([id]))}
    >
      {translatedPositions?.map((sq, index) => (
        <div
          key={index}
          className={classnames(styles.innerSquare, {
            [styles.isSelected]: selected === index,
          })}
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch(setMouseDown([id, index]));
          }}
          style={{
            transform: `translate(${sq?.left - initialPosition?.left}px, ${
              sq?.top - initialPosition?.top
            }px)`,
          }}
        />
      ))}
    </div>
  );
};

export default Square;
