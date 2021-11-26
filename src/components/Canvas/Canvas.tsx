import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCanvasPosition } from "../../redux/slices/globalSlice";

import styles from "./Canvas.module.scss";

const Canvas = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const client = ref.current?.getBoundingClientRect();

    client &&
      dispatch(
        setCanvasPosition({
          top: client.top,
          right: client.right,
          bottom: client.bottom,
          left: client.left,
        })
      );
  }, []);

  return <div className={styles.Canvas} ref={ref}></div>;
};

export default memo(Canvas);
