
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";

export function NavBar() {
  return (
    <Navbar fluid rounded className="">
      <NavbarBrand href="">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Maria's <span className="text-[#0891b2]">Shop</span></span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/460351065_2913977082085000_4728050088159002119_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGhvyLXwHQLJLMqKROuCaE0P_dFBoHpNyU_90UGgek3JfknV4Cv0E2IKwuRs6Pv8hJt_lbdfv2IqlggQF1V__R-&_nc_ohc=LVDy2rFNMKIQ7kNvgHa3NjX&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=ArFCLoGphm_w7Ma5UeCtbLS&oh=00_AYA30CFlE-zkblFJmcpFMoaQQEeIIDrUurNnJcyB3BqX9g&oe=67676910" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Maria Nawar</span>
            <span className="block truncate text-sm font-medium">maria@gmail.com</span>
          </DropdownHeader>
          <Link href="/Dashboard"><DropdownItem>Dashboard</DropdownItem></Link>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Control Activity</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse >
        <NavbarLink className="font-semibold" href="#" active>
          Home
        </NavbarLink>
        <NavbarLink className="font-medium" href="#">About</NavbarLink>
        <NavbarLink className="font-medium" href="#">Services</NavbarLink>
        <NavbarLink className="font-medium" href="#">Shop</NavbarLink>
        <NavbarLink className="font-medium" href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
