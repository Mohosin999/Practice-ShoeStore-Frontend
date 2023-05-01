import React, { useState } from "react";
import { useRouter } from "next/router";

const useButtonClickedEvent = () => {
  const [highlighted, setHighlighted] = useState(false);
  const router = useRouter();

  const handleClick = (path) => {
    setHighlighted(true);

    if (path === "") {
      router.back();
    } else {
      router.push(path);
    }

    setTimeout(() => {
      setHighlighted(false);
    }, 100);
  };
  return { highlighted, handleClick };
};

export default useButtonClickedEvent;
