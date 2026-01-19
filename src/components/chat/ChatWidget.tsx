"use client";

import { useState, lazy, Suspense } from "react";
import { ChatButton } from "./ChatButton";

// Lazy load the chat panel to avoid impacting initial page load
const ChatPanel = lazy(() =>
  import("./ChatPanel").then((mod) => ({ default: mod.ChatPanel }))
);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = () => {
    if (!hasOpened) {
      setHasOpened(true);
    }
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={handleToggle} />
      {hasOpened && (
        <Suspense fallback={null}>
          <ChatPanel isOpen={isOpen} onClose={handleClose} />
        </Suspense>
      )}
    </>
  );
}
