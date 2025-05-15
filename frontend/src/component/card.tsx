// import React from "react";

// import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({
  // itemId,
  selected,
  onClick,
  title,
}: {
  itemId: string;
  selected: boolean;
  onClick: Function;
  title: string;
}) {
  // const visibility = React.useContext(VisibilityContext);
  // const isVisible = visibility.useIsVisible(itemId, true);

  return (
    <div
      onClick={() => onClick()}
      role='button'
      style={{}}
      tabIndex={0}
      className='card'
    >
      <div>
        <div className='cardTitle'>
          <p style={{ textDecoration: selected ? "underline" : "" }}>{title}</p>
        </div>
        {/* <div style={{ backgroundColor: isVisible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(isVisible)}
        </div> */}
        {/* <div>selected: {JSON.stringify(!!selected)}</div> */}
      </div>
    </div>
  );
}
