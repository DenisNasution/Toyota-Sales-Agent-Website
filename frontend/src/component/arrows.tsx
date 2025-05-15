import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRight, faChevronRight, faChevronLeft);

export function LeftArrow() {
  const visibility = React.useContext(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() => visibility.scrollPrev()}
    >
      <FontAwesomeIcon className='iconUtil' icon={faChevronLeft} />{" "}
    </Arrow>
  );
}

export function RightArrow() {
  const visibility = React.useContext(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", false);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => visibility.scrollNext()}>
      <FontAwesomeIcon className='iconUtil' icon={faChevronRight} />{" "}
    </Arrow>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        // backgroundColor: "transparent",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}
