"use client";

import { useEffect, useState } from "react";
import CardModal from "@/components/modal/card-modal";
import { ProModal } from "../modal/pro-modal/proModal";

const ModalProviders = () => {
  // protect for hydration errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <CardModal />
      <ProModal/>
    </>
  );
};

export default ModalProviders;
