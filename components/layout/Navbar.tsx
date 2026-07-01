 import Container from "@/components/shared/Container";
import DesktopNav from "./DesktopNav";
import NavActions from "./NavActions";
import NavLogo from "./NavLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <NavLogo />

          <DesktopNav />

          <NavActions />
        </div>
      </Container>
    </header>
  );
}
