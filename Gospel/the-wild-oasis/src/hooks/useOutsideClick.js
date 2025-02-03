import { useEffect, useRef } from "react";

function useOutsideClick(handler) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        const clickedOutside = Boolean(
          e.target.children.namedItem(ref.current?.id)
        );
        if (clickedOutside) handler();
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler, ref]
  );

  return ref;
}

export default useOutsideClick;
