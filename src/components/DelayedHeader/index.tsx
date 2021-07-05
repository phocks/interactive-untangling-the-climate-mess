import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.scss";
import OrganicPanel from "../OrganicPanel";
import { nextUntil } from "../../nextUntil";
import convert from "react-from-dom";

interface DelayedHeaderProps {}

const DelayedHeader: React.FC<DelayedHeaderProps> = () => {
  const [contentArray, setContentArray] = useState<any>([]);

  // console.log(contentArray);

  const onMount = async () => {
    const markers = document.querySelectorAll(".preheader-container");
    const markersArray = Array.from(markers);

    setContentArray(markersArray);

    // const panelArray = markersArray.map((panel, i) => {
    //   const panelContainer = document.createElement("div");
    //   const elementArray: any = [];
    //   const panelElements = nextUntil(panel, "#endpreheaderpanel");
    //   // Add content to container element
    //   panelElements.forEach((element, iteration) => {
    //     const reactEl: any = convert(element);
    //     // reactEl.key = iteration;
    //     elementArray.push(reactEl);
    //   });
    //   console.log(elementArray)
    //   return elementArray;
    // });
    // console.log(panelArray);
    // setContentArray(panelArray);
  };

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {}, [contentArray]);

  return (
    <div className={styles.root}>
      <div
        id="visualKEYinitial"
        data-component="Anchor"
        data-mount="true"
      ></div>

      <div className={styles.heroText}>
        Climate change... <br />
        we get it, it’s a depressing mess.
      </div>

      <div className={styles.panel}>
        <OrganicPanel>
          {convert(contentArray[0])}

          {/* <p>
            We’ve spent the last thirty years not making the drastic changes
            needed to protect our way of life.
          </p>


          <p>We’ve even lost a few prime ministers over it.</p> */}
        </OrganicPanel>
      </div>

      <div className={styles.panel}>
        <OrganicPanel backgroundVariation={1}>
          {convert(contentArray[1])}
          {/* <p>
            For three decades, we’ve been told that ditching our love affair
            with carbon will make us poorer, hotter, colder and more prone to
            sitting in candlelit rooms, and not the romantic kind.
          </p>
          <p>
            But what if it didn’t have to? What if, instead of an impending
            apocalypse, this were a good news story for Australia? A story of
            how we dodged a bullet, much like we’ve managed with coronavirus
            (touch wood) and the GFC?
          </p> */}
        </OrganicPanel>
      </div>

      <div className={styles.panel}>
        <div id="visualKEY2" data-component="Anchor" data-mount="true"></div>
        <OrganicPanel backgroundVariation={2}>
          {convert(contentArray[2])}
          {/* <p>
            What if Australia could get to net zero and actually… improve our
            lives?
          </p> */}
        </OrganicPanel>
      </div>
    </div>
  );
};

export default DelayedHeader;
