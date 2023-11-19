import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {FC} from 'react'

export type Organization = {
    name:string
    id:string
    slug:string
    imageUrl:string
}
type Props = {
    isExpaned:boolean
    isActive:boolean
    onExpand:(id:string)=>void
    organization:Organization
}

const NavItem:FC<Props> = ({
    isExpaned,
    isActive,
    onExpand,
    organization
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const routes = [
        {
          label: "Boards",
          icon: <Layout className="h-4 w-4 mr-2" />,
          href: `/organization/${organization.id}`,
        },
        {
          label: "Activity",
          icon: <Activity className="h-4 w-4 mr-2" />,
          href: `/organization/${organization.id}/activity`,
        },
        {
          label: "Settings",
          icon: <Settings className="h-4 w-4 mr-2" />,
          href: `/organization/${organization.id}/settings`,
        },
        {
          label: "Billing",
          icon: <CreditCard className="h-4 w-4 mr-2" />,
          href: `/organization/${organization.id}/billing`,
        },
      ];

      const onClick = (href: string) => {
        router.push(href);
      };

  return (
    <AccordionItem value={organization.id} className='border-none'>
        <AccordionTrigger
            onClick={()=>onExpand(organization.id)}
            className={cn(
                "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                isActive && !isExpaned && "bg-sky-500/10 text-sky-700"
              )}
            >
                <div className="flex items-center gap-x-3">
                    <div className="w-7 h-7 relative">
                    <Image
                        src={organization.imageUrl}
                        alt={organization.name}
                        fill
                        className='object-cover'
                    />
                    </div>
                    <span className='text-sm font-medium'>
                    {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent
                className={cn(
                    "flex flex-col gap-y-1.5",
                    !isExpaned && "hidden"
                )}>
                {routes.map(({ label, icon, href }) => (
                    <Button
                        key={label}
                        onClick={() => onClick(href)}
                        className={cn(
                            "flex items-center justify-start gap-x-2  text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                            pathname === href && "bg-sky-500/10 text-sky-700"
                        )}
                        variant="ghost"
                    >
                        {icon}
                        <span className="text-sm font-medium">{label}</span>
                    </Button>
                ))}
                </AccordionContent>
    </AccordionItem>
  )
}

export default NavItem