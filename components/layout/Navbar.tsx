 import Container from "@/components/shared/Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavActions from "./NavActions";
import NavLogo from "./NavLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl relative">
      <Container>
        <div className="flex min-h-16 flex-nowrap items-center justify-between gap-3 py-2.5 sm:min-h-20 sm:py-3 lg:min-h-24 lg:gap-6 lg:py-4">
          <NavLogo />

          <DesktopNav />

          <NavActions />

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
