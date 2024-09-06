import type { IRenderTrackParams } from "react-range/lib/types";
import styles from "./SliderTrack.module.css";

export const SliderTrackHOC = ({
  monthRange,
  totalMonths,
}: {
  monthRange: [number, number];
  totalMonths: number;
}) => {
  /* From now on, what you're going to read code-wise is, to put it lightly, esoteric.
   * To conform to the design spec, I had to create a couple of container divs with absolute positioning and inline, js-calculated styles.
   * This was more low-level than usual, more akin to coding a videogame than a component for the web.
   * Please read the example that react-range provides: https://github.com/tajo/react-range/blob/main/examples/LabeledTwoThumbs.tsx
   * and the general documentation of the library: https://github.com/tajo/react-range
   */
  const knobsContainerWidthPercentage =
    ((monthRange[1] - monthRange[0]) * 100) / totalMonths;
  const knobsContainerLeftValue = (monthRange[0] * 100) / totalMonths;
  const SliderTrack = ({ props, children }: IRenderTrackParams) => (
    <div
      className={styles.trackOuter}
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
      }}
    >
      <div className={styles.trackBackground}></div>
      <div ref={props.ref} className={styles.trackInner}>
        <div
          className={styles.knobsContainerBackgroundLayer}
          style={{
            width: `calc(${knobsContainerWidthPercentage}% + 40px)`,
            left: `calc(${knobsContainerLeftValue}% - 20px)`,
          }}
        >
          <div className={styles.knobsContainer}></div>
        </div>
        {children}
      </div>
    </div>
  );
  return SliderTrack;
};
