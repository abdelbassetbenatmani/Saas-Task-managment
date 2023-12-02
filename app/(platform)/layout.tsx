import ModalProviders from "@/components/providers/modalProviders";
import QueryProviders from "@/components/providers/queryProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProviders>
        <Toaster position="top-center" />
        <ModalProviders />
        {children}
      </QueryProviders>
    </ClerkProvider>
  );
};

export default PlatformLayout;
