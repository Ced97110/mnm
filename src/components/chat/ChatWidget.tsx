"use client";

import { lazy, Suspense } from "react";
import { ChatButton } from "./ChatButton";
import { useChatContext } from "./ChatContext";

// Lazy load the chat panel to avoid impacting initial page load
const ChatPanel = lazy(() =>
  import("./ChatPanel").then((mod) => ({ default: mod.ChatPanel }))
);

export function ChatWidget() {
  const { isOpen, setIsOpen, toggle } = useChatContext();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggle} />
      {isOpen && (
        <Suspense fallback={null}>
          <ChatPanel isOpen={isOpen} onClose={handleClose} />
        </Suspense>
      )}
    </>
  );
}
