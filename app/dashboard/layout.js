
import { SidebarWrapper } from "./_components/SidebarWrapper";


export const metadata = {
  title: "Dashboard | Ruhul Amin",
  keywords: "Ruhul Amin, Portfolio, Web Developer, Software Engineer, Full Stack Developer, Next.js, React.js, MongoDB, Express.js, Node.js",
  description: " Iam a passionate web developer skilled in JavaScript, React, and Next.js. I love crafting responsive, user-friendly interfaces with clean design and strong functionality. Let’s build something great together!",
};

export default async function DashboardLayout({ children }) {
  return (
    <SidebarWrapper>
      {children}
    </SidebarWrapper>
  );
}
