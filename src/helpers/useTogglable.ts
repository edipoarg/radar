import { useState } from "react";

export const useTogglable = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => {
    setIsOpen((isOpenNow) => !isOpenNow);
  };
  return [isOpen, toggleIsOpen] as const;
};
