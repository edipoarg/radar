import { useEffect, useState } from "react";
import { NAVBAR_HEIGHT_IN_VH } from "../../constants";
import styles from "./Drawer.module.css";
import { FaSliders } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";

type Props = {
  open: boolean;
  visibleContent: JSX.Element;
  hiddenContent?: JSX.Element;
  toggleDrawerIsOpen: () => void;
  numberOfCases: number;
  onDownloadDataRequest: () => void;
};

type Vh = `${number}vh`;
const getVhByOpenState = (isOpen: boolean): Vh => (isOpen ? "60vh" : "0vh");

const useDeferredHeightCollapse = (timeInMs: number, isOpen: boolean) => {
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
export const Drawer = ({
  hiddenContent,
  visibleContent,
  open,
  toggleDrawerIsOpen,
  numberOfCases,
  onDownloadDataRequest,
}: Props) => {
  const {
    deferredIsOpen: shouldShowHiddenContent,
    maxHeight: hiddenContentContainerMaxHeight,
  } = useDeferredHeightCollapse(DRAWER_TRANSITION_MS, open);
  return (
    <div
      className={styles.drawerContainer}
      style={{ bottom: `${NAVBAR_HEIGHT_IN_VH + 1}vh` }}
    >
      <div className={styles.drawerInnerContent}>
        <div className={styles.upperFloatingButtonsContainer}>
          <article className={styles.numberOfAttacks}>
            {numberOfCases} casos
          </article>
          <div className={styles.rightSideFloatingButtons}>
            <button
              className={styles.floatingButtonWithIcon}
              type="button"
              onClick={toggleDrawerIsOpen}
            >
              <FaSliders />
            </button>
            <button
              className={styles.floatingButtonWithIcon}
              type="button"
              onClick={onDownloadDataRequest}
            >
              <GoDownload />
            </button>
          </div>
        </div>
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
