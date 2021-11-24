import { PropsWithChildren } from "react";

import styles from "./SideBar.module.scss";

export type Props = PropsWithChildren<{
  className?: string;
}>;

const SideBar = ({ children }: Props) => {
  return <div className={styles.SideBar}>{children}</div>;
};

export default SideBar;
