import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.scss";
import alternatingCaseToObject from "@abcnews/alternating-case-to-object";

const ROOT_PULL = 1000;
const DEADZONE_ADJUST = 500;
const TRIGGER_FROM_BOTTOM_PERCENTAGE = 20;

interface IntersectionTellerProps {
  setMarker: Function;
}

const IntersectionTeller: React.FC<IntersectionTellerProps> = (props) => {
  const componentRef = useRef({});
  const { current: component }: { current: any } = componentRef;

  // Init some component vars
  let initCount = component.initCount;
  let markerEls = component.markerElements;
  let markers = component.markers;
  let observer = component.observer;

  // This is called when a marker comes in or out of observation
  let processMarker = (entries) => {
    entries.forEach((entry) => {
      // Ignore once per marker due to Intersection Observer firing on page load
      if (initCount < markerEls.length) {
        initCount++;
        return;
      }

      // Don't observe top of root intersections
      if (entry.boundingClientRect.top < -DEADZONE_ADJUST) return;

      const idString: string = entry.target.id;
      const markerObject = alternatingCaseToObject(idString);

      if (entry.isIntersecting) {
        props.setMarker(markerObject.key);
      } else {
        const currentIndex = markers.indexOf(markerObject.key);
        const previousIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        const previousMarker = markers[previousIndex];

        props.setMarker(previousMarker);
      }
    });
  };

  // Initialise component
  useEffect(() => {
    observer = new IntersectionObserver(processMarker, {
      // Pull root top above the viewport
      rootMargin: `${ROOT_PULL}px 0% -${TRIGGER_FROM_BOTTOM_PERCENTAGE}%`,
    });

    markerEls = document.querySelectorAll('*[id^="visualKEY"]');
    markers = [...markerEls].map((el) => {
      return alternatingCaseToObject(el.id).key;
    });

    markerEls.forEach((markerEl) => {
      observer.observe(markerEl);
    });

    // Keep track of markers we've initialised
    // so they don't fire on load
    initCount = 0;

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div className={styles.root}></div>;
};

export default IntersectionTeller;
