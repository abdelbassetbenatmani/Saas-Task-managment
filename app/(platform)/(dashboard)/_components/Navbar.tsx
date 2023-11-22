import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";
import MobileSidebar from "./MobileSidebar";
import { FormPopOver } from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav className="h-20 flex justify-between items-center px-6 border-b  ">
      {/* Mobile Sidebar */}
      <MobileSidebar />
      <div className="md:flex md:space-x-4 md:items-center">
        <div className="hidden md:block">
        <Logo color="black" />
        </div>
        <FormPopOver
          side="bottom"
          sideOffset={20}
          align="start"
          
        >
        <Button>Create</Button>
        </FormPopOver>
      </div>
      <div className="flex space-x-2 items-center">
        <OrganizationSwitcher 
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-organization"
            appearance={{
                elements:{
                    rootBox:{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }
            }}
        />
        <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements:{
                    avatarBox:{
                        width: 40,
                        height: 40,
                    }
                }
            }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
