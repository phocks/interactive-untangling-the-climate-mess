import React, { useEffect, useState, useRef } from "react";
import { Portal } from "react-portal";
import SmoothScroll from "smooth-scroll";
import { isMount, getMountValue, selectMounts } from "@abcnews/mount-utils";
import { useDynamicText } from "../../lib/fetchDynamicText";
import Markdown from "markdown-to-jsx";

// Import stylsheets
import styles from "./styles.scss";

// Using the React context API for global state
import { AppContext } from "../../AppContext";

// Import components
import UserInputBox from "../UserInputBox/index";
import BackgroundTexture from "../BackgroundTexture/index";
import MainTangle from "../MainTangle/index";
import ScrollObserver from "../ScrollObserver/index";
import ParagraphObserver from "../ParagraphObserver/index";
import ParagraphPanel from "../ParagraphPanel/index";
import DelayedHeader from "../DelayedHeader/index";
import ParagraphFade from "../ParagraphFade";
import ParagraphPull from "../ParagraphPull";
import AudienceChart from "../AudienceChart";
import BarChart from "../BarChart";
import InteractivePanel from "../InteractivePanel";
import EndStrings from "../EndStrings";
import AnchorTransform from "../AnchorTransform";
import SkipAhead from "../SkipAhead";
import ResponsiveParagraphPanel from "../ResponsiveParagraphPanel";

import useWindowSize from "../ParagraphObserver/useWindowSize";
import { Client } from "@abcnews/poll-counters-client";
import alternatingCaseToObject from "@abcnews/alternating-case-to-object";
import to from "await-to-js";
const d3 = { ...require("d3-scale") };

// Set up our poll counter
const GROUP = "interactive-untangling-the-climate-mess";
const pollClient = new Client(GROUP);

const TOP_DOCK_POSITION = 0.02;
const BOTTOM_DOCK_POSITION = 0.9;
const BOTTOM_DOCK_SIDE_BY_SIDE_POSITION = 0.35;

// Promisify callback functions here whatever
const pollIncrement = (...args) =>
  new Promise((resolve, reject) => {
    pollClient.increment(...args, (err, question) => {
      if (err) return reject(err);
      resolve(question);
    });
  });

const pollGet = (...args) =>
  new Promise((resolve, reject) => {
    pollClient.get(...args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// Add all markers here. They control string visibility later
// const mainStringMarkers = ["initial", 1];
const endStringsMarkers = [
  "endstrings",
  "userstrings",
  "endallstrings",
  "endaustralia",
  "endstorycomplete"
];

const scroll = new SmoothScroll('a[href*="#"]', {
  offset: (anchor, toggle) => {
    const offset = window.innerHeight * 0.2;
    return offset;
  }
});

interface AppProps {
  projectName: string;
}

let scrollY = 0;
let initialPositioningComplete = false;

const App: React.FC<AppProps> = ({ projectName, ...props }) => {
  const { subscribe, unsubscribe } = window.__ODYSSEY__.scheduler;

  const [backdropOffset, setBackdropOffset] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(200);
  const [marker, _setMarker] = useState<any>();
  const markerRef = useRef(marker);
  // So we can use opacity in an event listener
  const setMarker = data => {
    markerRef.current = data;
    _setMarker(data);
  };

  const [userInputState, setUserInputState] = useState({});
  const [topAbove, setTopAbove] = useState();
  const [backgroundIsRendered, setBackgroundIsRendered] = useState();
  const [mainTangleOpacity, _setMainTangleOpacity] = useState(0.0);
  const mainTangleOpacityRef = useRef(mainTangleOpacity);
  // So we can use opacity in an event listener or setTimeout
  const setMainTangleOpacity = data => {
    mainTangleOpacityRef.current = data;
    _setMainTangleOpacity(data);
  };

  const [mainTangleXPos, setMainTangleXPos] = useState(0);
  const [mainTangleYPos, setMainTangleYPos] = useState(1.1);
  const [mainTangleScale, setMainTangleScale] = useState(100);
  const [endTangleOpacity, setEndTangleOpacity] = useState(0.0);
  const [mainTangleHidden, setMainTangleHidden] = useState(false);
  const [mainTangleMaskPos, setMainTangleMaskPos] = useState(0);
  const [endStrings, setEndStrings] = useState({});
  const [userStrings, setUserStrings] = useState({
    renewables: 1,
    transportation: 1,
    carboncapture: 1,
    industry: 1,
    livestock: 1
  });
  const [australiaStrings, setAustraliaStrings] = useState({
    renewables: 1,
    transportation: 1,
    carboncapture: 1,
    industry: 1,
    livestock: 1
  });
  const [interactivePanelElements, setInteractivePanelElements]: [
    any,
    any
  ] = useState();

  // User input state ----------------
  const [questionCompleteness, setQuestionCompleteness] = useState("nothing");
  const [convincedState, setConvincedState] = useState("orange");
  const [subQuestionsConvinvedOf, setSubQuestionsConvinvedOf] = useState(0);
  // ----------------
  const [australiaConvincedOf, setAustraliaConvincedOf] = useState(0);

  // Used to wait for transforms before intersection observing
  const [transformsComplete, setTransformsComplete] = useState(false);

  // Percentages of Australians convinced
  const [energyConvinced, setEnergyConvinced] = useState(0);
  const [livestockConvinced, setLiveStockConvinced] = useState(0);
  const [transportConvinced, setTransportConvinced] = useState(0);
  const [industryConvinced, setIndustryConvinced] = useState(0);
  const [carbonCaptureConvinced, setCarbonCaptureConvinced] = useState(0);

  // Used to test if the user has actively engaged with the article
  // (whether that is by reading it or clicking on a button, etc)
  // Immediately invoking this effect just because it will only be used once.
  const [userHasEngaged, setUserHasEngaged] = useState(false);

  const {
    dynamicText,
    dynamicTextLoading,
    dynamicTextError
  } = useDynamicText();
  // console.log("dt", dynamicText);

  const mounts = selectMounts("skipahead", { includeOwnUsed: true });

  useEffect(() => {
    if (!userHasEngaged) return;
    console.log("User has engaged!");

    (async () => {
      const [err, result] = await to(
        pollIncrement({
          question: "USERINFO",
          answer: "engagement-count"
        })
      );

      if (err) console.error(err);
    })();
  }, [userHasEngaged]);

  const [numberOfEngagedUsers, setNumberOfEngagedUsers] = useState(0);

  // Track if we are on Desktop or not
  const [isDesktop, setIsDesktop] = useState(false);

  // Switch between pull left (Tim) and centered (Ben) opening
  const [openingCentered, setOpeningCentered] = useState(true);
  const [isPastOpening, setIsPastOpening] = useState(false);

  const componentRef = useRef({});
  const { current: component }: { current: any } = componentRef;

  const windowSize = useWindowSize();

  const onScrollUpdate = () => {
    scrollY = window.pageYOffset;

    // Only process when user at top
    if (scrollY > window.innerHeight * 2 || mainTangleOpacityRef.current < 0.9)
      return;

    const percentScale = d3
      .scaleLinear()
      .domain([0, window.innerHeight])
      .range([
        openingCentered
          ? BOTTOM_DOCK_POSITION
          : BOTTOM_DOCK_SIDE_BY_SIDE_POSITION,
        TOP_DOCK_POSITION
      ])
      .clamp(true);

    setMainTangleYPos(percentScale(scrollY));
  };

  const applySkipAhead = async (
    questionSkipped: string,
    convincedState: string = "hopeful"
  ) => {
    console.log("User skipped ahead!");
    if (!questionSkipped) return;

    // When a user skips down the page,
    // that means they are probably "convinced"
    // So out of the possible options "certain" "hopeful" "doubtful" "impossible"
    // Let's set "hopeful" (possibly "certain")
    // It should come out binary in the end anyway
    setUserInputState(prevState => {
      return { ...prevState, [questionSkipped]: convincedState };
    });

    const result = await pollIncrement({
      question: questionSkipped,
      answer: convincedState
    });
    console.log(result);
  };

  // onMount
  useEffect(() => {
    pollGet().then((result: any) => {
      const values = result.value;

      if (!values) return;

      console.log(values);

      const pollTotals: any = {};

      // If more people are convinced than unconvinced then remove string
      function getAustraliaConvinced(keyString: string) {
        const certainOn: number = values[keyString].certain || 0;
        const hopefulOn: number = values[keyString].hopeful || 0;
        const doubtfulOn: number = values[keyString].doubtful || 0;
        const impossibleOn: number = values[keyString].impossible || 0;

        // Get number convinced
        const convincedCount = certainOn + hopefulOn;
        const unconvincedCount = doubtfulOn + impossibleOn;

        // Enter Australia convinced or not
        return convincedCount > unconvincedCount ? 0 : 1;
      }

      pollTotals.renewables = getAustraliaConvinced(
        "SUBQ1-renewables-zero-carbon"
      );
      pollTotals.livestock = getAustraliaConvinced("SUBQ2-livestock-emissions");
      pollTotals.transportation = getAustraliaConvinced(
        "SUBQ3-transportation-off-fossil"
      );
      pollTotals.industry = getAustraliaConvinced("SUBQ4-industry-emissions");
      pollTotals.carboncapture = getAustraliaConvinced("SUBQ5-carbon-capture");

      setAustraliaStrings(pollTotals);

      // Count how many areas Australia is convinced of
      // For later comparison in interactive panels
      let localAusConvinced = 0;

      for (const area in pollTotals) {
        if (pollTotals[area] === 0) localAusConvinced++;
      }

      setAustraliaConvincedOf(localAusConvinced);

      // Get percentages of people convinced
      const getPercentageConvinced = (keyString: string, values: any) => {
        const certainOn: number = values[keyString].certain || 0;
        const hopefulOn: number = values[keyString].hopeful || 0;
        const doubtfulOn: number = values[keyString].doubtful || 0;
        const impossibleOn: number = values[keyString].impossible || 0;

        // Get number convinced
        const convincedCount: number = certainOn + hopefulOn;
        const unconvincedCount: number = doubtfulOn + impossibleOn;

        // Calculate percentages

        const total: number = convincedCount + unconvincedCount;
        const percentConvinced: number = (convincedCount / total) * 100;

        return Math.round(percentConvinced);
      };

      setEnergyConvinced(
        getPercentageConvinced("SUBQ1-renewables-zero-carbon", values)
      );
      setLiveStockConvinced(
        getPercentageConvinced("SUBQ2-livestock-emissions", values)
      );
      setTransportConvinced(
        getPercentageConvinced("SUBQ3-transportation-off-fossil", values)
      );
      setIndustryConvinced(
        getPercentageConvinced("SUBQ4-industry-emissions", values)
      );
      setCarbonCaptureConvinced(
        getPercentageConvinced("SUBQ5-carbon-capture", values)
      );
    });

    // document.addEventListener("scroll", onScrollUpdate);
    subscribe(onScrollUpdate);

    // Set up interactive panel elements
    const panelStarters: any = document.querySelectorAll(
      "[id^='interactivepanel']"
    );
    const panelsArray = [...panelStarters];

    setInteractivePanelElements(panelsArray);

    // Let's try to convert some anchors into colored pillboxes
    const anchors = document.getElementsByTagName("a");
    const anchorArray = Array.from(anchors);

    // Filter the ones with #pillbox
    const pillBoxes = anchorArray.filter(anchor => {
      const href: string = anchor.href || "";
      const reg = /#pillbox.*/;
      const match = href.match(reg);

      if (match) return true;
    });

    // Loop through and transform
    for (const pill of pillBoxes) {
      const href: string = pill.href || "";
      const reg = /#pillbox.*/;
      const match = href.match(reg);

      if (match) {
        const config = alternatingCaseToObject(match[0]);

        const pillEl = document.createElement("strong");
        pillEl.innerHTML = pill.innerHTML;

        pillEl.classList.add(styles.pillbox);
        pillEl.style.backgroundColor = `#${config.color}`;

        if (pill.parentNode) {
          pill.parentNode.replaceChild(pillEl, pill);
        }
      }
    }

    (async () => {
      // Get number of engaged users from Firebase
      const [err, pollGetResponse]: [any, any] = await to(
        pollGet({
          question: "USERINFO",
          answer: "engagement-count"
        })
      );

      if (!err) {
        setNumberOfEngagedUsers(pollGetResponse.value);
      }
    })();

    return () => {
      unsubscribe(onScrollUpdate);
      // document.removeEventListener("scroll", onScrollUpdate);
    };
  }, []);

  // USED TO START TANGLE AT BOTTOM OF SCREEN AT FIRST
  // WE ARE TRYING TO MOVE THIS FUNCTIONALITY INTO THE MAIN TANGLE
  // COMPONENT
  useEffect(() => {
    if (!backgroundIsRendered) return;

    setTimeout(() => {
      // Wait a while before we bring in the tangle
      setTimeout(() => {
        if (markerRef.current === "initial")
          setMainTangleYPos(
            openingCentered
              ? BOTTOM_DOCK_POSITION
              : BOTTOM_DOCK_SIDE_BY_SIDE_POSITION
          );
        // else setMainTangleYPos(markerConfig[markerRef.current] || 0.01);
        // TODO: Start at Core position config
        else setMainTangleYPos(0.01);

        // We have initially positioned
        initialPositioningComplete = true;

        // Otherwise the tangle is invisible
        setMainTangleOpacity(1.0);
      }, 1000);
    }, 100); // Wait a bit or else doesn't work properly
  }, [backgroundIsRendered]);

  // Effect when userInputState is changed
  useEffect(() => {
    if (!userInputState) return;

    /**
     * Here we are combining sentiment to simply positive or negative
     * or convinced or unconvinced, depending on which subquestion
     * or SUBQ a user presses.
     */

    // Check user state (buttons pressed) and act accordingly
    const nextUserStrings = userStrings;

    // Check renewables yes or no
    if (userInputState["SUBQ1-renewables-zero-carbon"]) {
      switch (userInputState["SUBQ1-renewables-zero-carbon"]) {
        case "certain":
        case "hopeful":
          nextUserStrings.renewables = 0;
          break;
        case "doubtful":
        case "impossible":
          nextUserStrings.renewables = 1;
          break;
      }
    }

    // Check livestock yes or no
    if (userInputState["SUBQ2-livestock-emissions"]) {
      switch (userInputState["SUBQ2-livestock-emissions"]) {
        case "certain":
        case "hopeful":
          nextUserStrings.livestock = 0;
          break;
        case "doubtful":
        case "impossible":
          nextUserStrings.livestock = 1;
          break;
      }
    }

    // Check if SUBQ3-transportation-off-fossil yes or no
    if (userInputState["SUBQ3-transportation-off-fossil"]) {
      switch (userInputState["SUBQ3-transportation-off-fossil"]) {
        case "certain":
        case "hopeful":
          nextUserStrings.transportation = 0;
          break;
        case "doubtful":
        case "impossible":
          nextUserStrings.transportation = 1;
          break;
      }
    }

    // Check if SUBQ4-industry-emissions yes or no
    if (userInputState["SUBQ4-industry-emissions"]) {
      switch (userInputState["SUBQ4-industry-emissions"]) {
        case "certain":
        case "hopeful":
          nextUserStrings.industry = 0;
          break;
        case "doubtful":
        case "impossible":
          nextUserStrings.industry = 1;
          break;
      }
    }

    // Check if SUBQ5-carbon-capture yes or no
    if (userInputState["SUBQ5-carbon-capture"]) {
      switch (userInputState["SUBQ5-carbon-capture"]) {
        case "certain":
        case "hopeful":
          nextUserStrings.carboncapture = 0;
          break;
        case "doubtful":
        case "impossible":
          nextUserStrings.carboncapture = 1;
          break;
      }
    }

    setUserStrings(nextUserStrings);

    // Count up number user convinced by
    // I DON'T THINK THIS IS WORKING
    let localConvincedCount = 0;

    for (const area in nextUserStrings) {
      if (nextUserStrings[area] === 0) localConvincedCount++;
    }

    setSubQuestionsConvinvedOf(localConvincedCount);

    // Calculate questionCompleteness
    function getMAIN1string(state): string {
      if (state["MAINQ1-can-we-still-save-the-world"]) return "yesMAIN1";
      else return "noMAIN1";
    }

    function getSUBstring(state): string {
      // SUBQ1-renewables-zero-carbon
      // SUBQ2-livestock-emissions
      // SUBQ3-transportation-off-fossil
      // SUBQ4-industry-emissions
      // SUBQ5-carbon-capture

      if (
        state["SUBQ1-renewables-zero-carbon"] &&
        state["SUBQ2-livestock-emissions"] &&
        state["SUBQ3-transportation-off-fossil"] &&
        state["SUBQ4-industry-emissions"] &&
        state["SUBQ5-carbon-capture"]
      )
        return "allSUB";

      if (
        state["SUBQ1-renewables-zero-carbon"] ||
        state["SUBQ2-livestock-emissions"] ||
        state["SUBQ3-transportation-off-fossil"] ||
        state["SUBQ4-industry-emissions"] ||
        state["SUBQ5-carbon-capture"]
      )
        return "someSUB";

      return "noSUB";
    }

    function getMAIN2(state): string {
      if (state["MAINQ2-can-we-still-save-the-world-again-after-article"])
        return "yesMAIN2";

      return "noMAIN2";
    }

    const combinedCompletenessStrings =
      getMAIN1string(userInputState) +
      getSUBstring(userInputState) +
      getMAIN2(userInputState);

    setQuestionCompleteness(combinedCompletenessStrings);

    // Determine if main question level changed
    const mainChangeLevels = {
      certain: 4,
      hopeful: 3,
      doubtful: 2,
      impossible: 1
    };

    const main1 = userInputState["MAINQ1-can-we-still-save-the-world"];
    const main2 =
      userInputState["MAINQ2-can-we-still-save-the-world-again-after-article"];

    const mainLevel1 = mainChangeLevels[main1];
    const mainLevel2 = mainChangeLevels[main2];

    if (mainLevel1 && main2) {
      if (mainLevel1 === mainLevel2) setConvincedState("orange");
      if (mainLevel1 > mainLevel2) setConvincedState("red");
      if (mainLevel1 < mainLevel2) setConvincedState("green");
    }
  }, [userInputState]);

  useEffect(() => {
    // This effect does something depending on what marker it is
    if (typeof marker === "undefined") return;

    // Position tangle according to marker
    // TODO: Now handled by CoreMedia #hash
    // if (
    //   typeof markerConfig[marker] !== "undefined" &&
    //   initialPositioningComplete
    // ) {
    //   setMainTangleYPos(markerConfig[marker]);
    // }

    if (marker === 18) {
      // Hide main tangle for performance sake
      // after a certain point
      setEndTangleOpacity(0.0);
    }

    // Primarily for scrolling back up. We un-hide the main tangle
    // And hide the end tangle.
    if (marker === 19) {
      setMainTangleOpacity(1.0);
      setEndStrings({
        renewables: 0,
        transportation: 0,
        carboncapture: 0,
        industry: 0,
        livestock: 0
      });
    }

    // Make end strings visible if needed
    if (endStringsMarkers.includes(marker)) setEndTangleOpacity(1.0);
    else setEndTangleOpacity(0.0);

    // mechanism for bringing in appropriate strings
    if (marker === "endstrings") {
      setMainTangleOpacity(0.0);

      setEndStrings({
        renewables: 0,
        transportation: 0,
        carboncapture: 0,
        industry: 0,
        livestock: 0
      });
    }

    if (marker === "endallstrings") {
      setEndStrings({
        renewables: 1,
        transportation: 1,
        carboncapture: 1,
        industry: 1,
        livestock: 1
      });
    }

    if (marker === "userstrings") {
      setEndStrings(userStrings);
    }

    if (marker === "endaustralia") {
      setEndStrings(australiaStrings);
    }

    if (marker === "endstorycomplete") {
      setEndStrings({
        renewables: 0,
        transportation: 0,
        carboncapture: 0,
        industry: 0,
        livestock: 0
      });
    }

    // If user has scrolled enough, set them as has engaged
    if (marker === 2) {
      setUserHasEngaged(true);
    }

    console.log("Current marker", marker);
  }, [marker]);

  useEffect(() => {
    if (!windowSize) return;

    const { width, height } = windowSize;

    // On Desktop
    if (width >= 1200) {
      if (openingCentered) {
        if (isPastOpening) setMainTangleXPos(-0.25);
        if (!isPastOpening) setMainTangleXPos(0.0);
      } else setMainTangleXPos(-0.25);
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
      setMainTangleXPos(0.0);
    }
  }, [windowSize.width, windowSize.height, isPastOpening]);

  console.log(dynamicText);

  return (
    <AppContext.Provider value={{ topAbove, setTopAbove }}>
      <Portal node={document && document.querySelector(".delayed-header")}>
        <DelayedHeader
          setTransformsComplete={setTransformsComplete}
          openingCentered={openingCentered}
          isDesktop={isDesktop}
          setIsPastOpening={setIsPastOpening}
        />
      </Portal>

      <Portal node={document && document.getElementById("inputtier1")}>
        <UserInputBox
          color={"#2A4059"}
          questionKey="MAINQ1-can-we-still-save-the-world"
          title={"Can we still save the world?"}
          buttons={[
            {
              label: "Of course we can",
              value: "certain",
              response: <Markdown>{dynamicText["MAINQ1-optimistic"]}</Markdown>
            },
            {
              label: "Yes I think we can",
              value: "hopeful",
              response: <Markdown>{dynamicText["MAINQ1-optimistic"]}</Markdown>
            },
            {
              label: "Probably not",
              value: "doubtful",
              response: <Markdown>{dynamicText["MAINQ1-pessimistic"]}</Markdown>
            },
            {
              label: "No way we're screwed",
              value: "impossible",
              response: <Markdown>{dynamicText["MAINQ1-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      {/* Energy questions */}

      <Portal node={document && document.getElementById("inputzerocarbon")}>
        <UserInputBox
          color={"#A3297C"}
          questionKey="SUBQ1-renewables-zero-carbon"
          title={"So - what do you reckon our chances of doing this are?"}
          buttons={[
            {
              label: "That's a piece of cake",
              value: "certain",
              response: <Markdown>{dynamicText["SUBQ1-optimistic"]}</Markdown>
            },
            {
              label: "It can be done",
              value: "hopeful",
              response: <Markdown>{dynamicText["SUBQ1-optimistic"]}</Markdown>
            },
            {
              label: "This sounds like a stretch",
              value: "doubtful",
              response: <Markdown>{dynamicText["SUBQ1-pessimistic"]}</Markdown>
            },
            {
              label: "You're dreaming",
              value: "impossible",
              response: <Markdown>{dynamicText["SUBQ1-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      {/* Livestock user input here */}
      {/* inputlivestockemissions */}

      <Portal
        node={document && document.getElementById("inputlivestockemissions")}
      >
        <UserInputBox
          color={"#F65C1B"}
          questionKey="SUBQ2-livestock-emissions"
          title={"Can we reach reach zero livestock emissions?"}
          buttons={[
            {
              label: "That's a piece of cake",
              value: "certain",
              response: <Markdown>{dynamicText["SUBQ2-optimistic"]}</Markdown>
            },
            {
              label: "It can be done",
              value: "hopeful",
              response: <Markdown>{dynamicText["SUBQ2-optimistic"]}</Markdown>
            },
            {
              label: "This sounds like a stretch",
              value: "doubtful",
              response: <Markdown>{dynamicText["SUBQ2-pessimistic"]}</Markdown>
            },
            {
              label: "You're dreaming",
              value: "impossible",
              response: <Markdown>{dynamicText["SUBQ2-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      <Portal
        node={document && document.getElementById("inputfossiltransport")}
      >
        <UserInputBox
          color={"#007cbf"}
          questionKey="SUBQ3-transportation-off-fossil"
          title={
            "So now you know how we quit fossil fuels in our transport system, can we do it?"
          }
          buttons={[
            {
              label: "That's a piece of cake",
              value: "certain",
              response: <Markdown>{dynamicText["SUBQ3-optimistic"]}</Markdown>
            },
            {
              label: "It can be done",
              value: "hopeful",
              response: <Markdown>{dynamicText["SUBQ3-optimistic"]}</Markdown>
            },
            {
              label: "This sounds like a stretch",
              value: "doubtful",
              response: <Markdown>{dynamicText["SUBQ3-pessimistic"]}</Markdown>
            },
            {
              label: "You're dreaming",
              value: "impossible",
              response: <Markdown>{dynamicText["SUBQ3-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      {/* Industry input buttons go here */}
      {/* inputindustryemissions */}
      <Portal
        node={document && document.getElementById("inputindustryemissions")}
      >
        <UserInputBox
          color={"#007B52"}
          questionKey="SUBQ4-industry-emissions"
          title={"Can we elliminate emissions from industry?"}
          buttons={[
            {
              label: "That's a piece of cake",
              value: "certain",
              response: <Markdown>{dynamicText["SUBQ4-optimistic"]}</Markdown>
            },
            {
              label: "It can be done",
              value: "hopeful",
              response: <Markdown>{dynamicText["SUBQ4-optimistic"]}</Markdown>
            },
            {
              label: "This sounds like a stretch",
              value: "doubtful",
              response: <Markdown>{dynamicText["SUBQ4-pessimistic"]}</Markdown>
            },
            {
              label: "You're dreaming",
              value: "impossible",
              response: <Markdown>{dynamicText["SUBQ4-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      {/* <Portal node={document && document.getElementById("inputcarboncapture")}>
        <UserInputBox
          color={"#2A4059"}
          questionKey="SUBQ5-carbon-capture"
          title={"So, what do you think? Can we capture all that carbon?"}
          buttons={[
            { label: "That's a piece of cake", value: "certain" },
            { label: "It can be done", value: "hopeful" },
            { label: "This sounds like a stretch", value: "doubtful" },
            { label: "You're dreaming", value: "impossible" }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal> */}

      <Portal node={document && document.getElementById("inputtier1again")}>
        <UserInputBox
          color={"#2A4059"}
          questionKey="MAINQ2-can-we-still-save-the-world-again-after-article"
          title={"So, how about now? Can we save the world?"}
          buttons={[
            {
              label: "Of course we can",
              value: "certain",
              response: <Markdown>{dynamicText["MAINQ2-optimistic"]}</Markdown>
            },
            {
              label: "Yes I think we can",
              value: "hopeful",
              response: <Markdown>{dynamicText["MAINQ2-optimistic"]}</Markdown>
            },
            {
              label: "Probably not",
              value: "doubtful",
              response: <Markdown>{dynamicText["MAINQ2-pessimistic"]}</Markdown>
            },
            {
              label: "No way we're screwed",
              value: "impossible",
              response: <Markdown>{dynamicText["MAINQ2-pessimistic"]}</Markdown>
            }
          ]}
          setUserInputState={setUserInputState}
          pollClient={pollClient}
          windowWidth={windowSize.width}
        />
      </Portal>

      <Portal node={document && document.getElementById("chartproportions")}>
        <BarChart
          bars={[
            {
              title: "Energy",
              percent: 33,
              color: "#A3297C",
              textColor: "#A3297C"
            },
            {
              title: "Burping cows",
              percent: 10,
              color: "#F65C1B", //"#2A4059",
              textColor: "#C42F05" //"#2A4059"
            },
            {
              title: "Transport",
              percent: 20,
              color: "#007CBF", //#007B52",
              textColor: "#007CBF" //"#007B52"
            },
            {
              title: "Industry",
              percent: 40,
              color: "#007B52", //"#F65C1B",
              textColor: "#007B52"
            }
          ]}
        />
      </Portal>

      <Portal node={document && document.getElementById("chartconvinced")}>
        <AudienceChart
          bars={[
            {
              title: "Energy",
              percent: energyConvinced,
              color: "#A3297C",
              textColor: "#A3297C"
            },
            {
              title: "Burping cows",
              percent: livestockConvinced,
              color: "#F65C1B",
              textColor: "#C42F05"
            },
            {
              title: "Transport",
              percent: transportConvinced,
              color: "#007CBF",
              textColor: "#007CBF"
            },
            {
              title: "Industry",
              percent: industryConvinced,
              color: "#007B52",
              textColor: "#007B52"
            }
            // {
            //   title: "Carbon capture",
            //   percent: carbonCaptureConvinced,
            //   color: "#2A4059",
            //   textColor: "#2A4059"
            // }
          ]}
          windowWidth={windowSize.width}
        ></AudienceChart>
      </Portal>

      {/* Background visual */}
      <Portal node={document && document.getElementById("portalmount")}>
        {/* Don't unmount this because elements are being observed by ParagraphObserver
        and they get lost otherwise.
          Maybe try visibility hidden or display none instead */}
        <MainTangle
          animationFrame={animationFrame}
          scrollMarker={marker}
          setBackgroundIsRendered={setBackgroundIsRendered}
          opacity={mainTangleOpacity}
          xPos={mainTangleXPos}
          yPos={mainTangleYPos}
          scale={mainTangleScale}
          hidden={mainTangleHidden}
          maskPosition={mainTangleMaskPos}
          windowSize={windowSize}
        />

        <EndStrings
          opacity={endTangleOpacity}
          stringsNew={endStrings}
          windowSize={windowSize}
          xPos={mainTangleXPos}
          yPos={mainTangleYPos}
        />
        <BackgroundTexture />
      </Portal>

      {/* Sets paragraph text where we break out of 
        scrolly panels (and hide background animations on mobile) */}

      {/* Note: rewriting the paragraph panels */}
      {backgroundIsRendered && (
        <>
          {/* A panel that goes over the top with paragraph text on it #paragraphpanel */}
          {/* <ParagraphPanel setMaskPosition={setMainTangleMaskPos} /> */}
          {/* <ParagraphObserver /> */}
          {/* <ParagraphFade setMainTangleOpacity={setMainTangleOpacity} /> */}
          {/* <ParagraphPull
            setMainTangleOpacity={setMainTangleOpacity}
            setMainTangleYPos={setMainTangleYPos}
            mainTangleYPos={mainTangleYPos}
            setMainTangleHidden={setMainTangleHidden}
          /> */}
          <ResponsiveParagraphPanel />
        </>
      )}

      {/* Just a line down the center of the screen for testing */}
      {/* <div className={styles.centerHint} /> */}

      {interactivePanelElements?.map((panel, iteration) => {
        const panelConfig = alternatingCaseToObject(panel.id);

        return (
          <Portal key={iteration} node={panel}>
            <InteractivePanel
              panelKey={panelConfig.key}
              questionCompleteness={questionCompleteness}
              convincedState={convincedState}
              subQuestionsConvinvedOf={subQuestionsConvinvedOf}
              australiaConvincedOf={australiaConvincedOf}
              userInputState={userInputState}
            />
          </Portal>
        );
      })}

      <AnchorTransform>{numberOfEngagedUsers.toLocaleString()}</AnchorTransform>

      <ScrollObserver
        setMarker={setMarker}
        setMainTangleYPos={setMainTangleYPos}
        setMainTangleXPos={setMainTangleXPos}
        waypoint={80}
        transformsComplete={transformsComplete}
        isDesktop={isDesktop}
      />

      {mounts.map((mount, index) => {
        return (
          <Portal key={index} node={mount}>
            <SkipAhead
              mount={mount}
              scroll={scroll}
              applySkipAhead={applySkipAhead}
            />
          </Portal>
        );
      })}
    </AppContext.Provider>
  );
};

export default App;
