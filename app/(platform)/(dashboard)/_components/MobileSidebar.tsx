"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidbar from "./Sidbar";

type Props = {};

const MobileSidebar = (props: Props) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <Button
        variant="ghost"
        className="block md:hidden"
        onClick={onOpen}
        size="sm">
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet 
        open={isOpen}
        onOpenChange={onClose}

      >
        <SheetContent
            side={'left'}
            className="ps-4 pt-10"
        >
          <Sidbar
            storageKey="taskona-mobile-sidbar"
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
