"use client";
import React, { FC } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import NavItem, { Organization } from "./NavItem";

interface Props {
  storageKey?: string;
}
const Sidbar: FC<Props> = ({ storageKey = "taskona-sidbar" }) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: isOrganization, isLoaded: organizationLoaded } =
    useOrganization();
  const { userMemberships, isLoaded: organizationsLoadedList } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };
  if (
    !organizationLoaded ||
    !organizationsLoadedList ||
    userMemberships.isLoading
  ) {
    return (
      <div className="w-full">
        <Skeleton className="w-64 h-64" />
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold">Organizations</h2>
          <Link href="/select-organization">

              <Button
                className="flex items-center justify-center"
                variant="outline"
              >
                <Plus className="w-4 h-4 " />
              </Button>

          </Link>
        </div>
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValue}
          className="space-y-2"
        >
          {
            userMemberships.data?.map(({organization}) => (
              <NavItem
                key={organization.id}
                isActive={isOrganization?.id === organization.id}
                isExpaned={expanded[organization.id]}
                organization={organization as Organization}
                onExpand={onExpand}
              />
            ))
          }

        </Accordion>

      </div>
    </>
  );
};

export default Sidbar;
