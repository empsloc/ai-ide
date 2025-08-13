import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '../ui/button'
import { MessageCircleCode } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import SideBarFooter from './SideBarFooter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
function AppSideBar() {
  const router = useRouter();
  return (
    <Sidebar  >
      <SidebarHeader  className='p-5'>
        <Link href={"/"}><Image src={'/logo.svg'} alt='logo' width={30} height={30}/></Link>
        <Button  onClick={() => router.push("/")}  className='mt-5 cursor-pointer'><MessageCircleCode/>Start New Chat </Button>

      </SidebarHeader>
      <SidebarContent className='p-5'>
        <SidebarGroup >
            <WorkspaceHistory/>
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <SideBarFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar