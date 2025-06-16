import { useEffect, useState } from "react";
import styles from "./Drawer.module.css";
import { FaSliders } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import type { Vh } from "../../../types/styles";
import { NumberOfAttacks } from "../NumberOfAttacks/NumberOfAttacks";

type Props = {
  open: boolean;
  visibleContent: JSX.Element;
  hiddenContent?: JSX.Element;
  toggleDrawerIsOpen: () => void;
  numberOfCases: number;
  onDownloadDataRequest: () => void;
  bottom: Vh;
  className?: string;
};

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
  bottom,
  className,
}: Props) => {
  const {
    deferredIsOpen: shouldShowHiddenContent,
    maxHeight: hiddenContentContainerMaxHeight,
  } = useDeferredHeightCollapse(DRAWER_TRANSITION_MS, open);
  return (
    <div
      className={`${styles.drawerContainer} ${className ?? ""}`}
      style={{ bottom }}
    >
      <div className={styles.drawerInnerContent}>
        <div className={styles.upperFloatingButtonsContainer}>
          <NumberOfAttacks number={numberOfCases} />
          <div className={styles.rightSideFloatingButtons}>
            <button
              className={styles.floatingButtonWithIcon}
              type="button"
              title="Descargar datos filtrados"
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
