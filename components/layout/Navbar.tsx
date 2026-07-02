 import Container from "@/components/shared/Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavActions from "./NavActions";
import NavLogo from "./NavLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-24 flex-wrap items-center justify-between gap-4 py-4 lg:flex-nowrap lg:gap-6">
          <NavLogo />

          <DesktopNav />

          <NavActions />

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
