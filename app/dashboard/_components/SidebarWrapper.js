
import DashboardSectionWrapper from "./DashboardSectionWrapper";
import { DashboardSidebar } from "./DashboardSidebar";

export function SidebarWrapper({ children }) {


  return (
    <div className="relative flex min-h-screen  ">

      {/* Sidebar */}
     
            <DashboardSidebar/>
      {/* Main content */}
    
      <main className="flex-1 ml-0 lg:ml-[280px] bg-white text-black min-h-screen">
          <DashboardSectionWrapper>
        {children}</DashboardSectionWrapper>
      </main>
    </div>
  );
}
