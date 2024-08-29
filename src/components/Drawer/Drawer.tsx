import { useEffect, useState } from "react";
import { NAVBAR_HEIGHT_IN_VH } from "../../constants";
import styles from "./Drawer.module.css";

type Props = {
  open: boolean;
  visibleContent: JSX.Element;
  hiddenContent: JSX.Element;
};

type Vh = `${number}vh`;
const getVhByOpenState = (isOpen: boolean): Vh => (isOpen ? "60vh" : "0vh");

const useDefferedHeightCollapse = (timeInMs: number, isOpen: boolean) => {
  const [deferredIsOpen, setDeferredIsOpen] = useState(isOpen);
  const [hiddenContentMaxHeight, setMaxHeight] = useState<Vh>(
    getVhByOpenState(isOpen),
  );
  useEffect(() => {
    setMaxHeight(getVhByOpenState(isOpen));
    if (isOpen) {
      setDeferredIsOpen(true);
    } else {
      const timeoutID = setTimeout(() => {
        setDeferredIsOpen(false);
      }, timeInMs);
      return () => clearTimeout(timeoutID);
    }
  }, [isOpen, timeInMs]);

  return {
    deferredIsOpen,
    maxHeight: hiddenContentMaxHeight,
  };
};

const DRAWER_TRANSITION_MS = 1000;
export const Drawer = ({ hiddenContent, visibleContent, open }: Props) => {
  const {
    deferredIsOpen: shouldShowHiddenContent,
    maxHeight: hiddenContentContainerMaxHeight,
  } = useDefferedHeightCollapse(DRAWER_TRANSITION_MS, open);
  return (
    <div
      className={`${styles.drawerContainer}`}
      style={{
        position: "absolute",
        bottom: `${NAVBAR_HEIGHT_IN_VH + 1}vh`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {visibleContent}
        <div
          style={{
            maxHeight: hiddenContentContainerMaxHeight,
            transition: `max-height ${DRAWER_TRANSITION_MS / 1000}s`,
          }}
          className={`${styles.hiddenContentContainer} ${shouldShowHiddenContent ? styles.open : styles.closed}`}
        >
          {shouldShowHiddenContent && hiddenContent}
        </div>
      </div>
    </div>
  );
};
