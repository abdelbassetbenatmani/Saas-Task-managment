"use client";

import { useEffect, useState } from "react";
import CardModal from "@/components/modal/card-modal";

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
    </>
  );
};

export default ModalProviders;
