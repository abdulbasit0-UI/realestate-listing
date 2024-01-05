import { render } from "@testing-library/react";
import Navbar from "../app/components/Navbar/Navbar";
import UserMenu from "../app/components/Navbar/UserMenu";
import SearchFilters from "../app/components/Navbar/SearchFilters";
import Logo from "../app/components/Navbar/Logo";

jest.mock("../app/components/Navbar/UserMenu", () => ({
  __esModule: true,
  default: jest.fn(() => <div>UserMenu</div>),
}));

jest.mock("../app/components/Navbar/SearchFilters", () => ({
  __esModule: true,
  default: jest.fn(() => <div>SearchFilters</div>),
}));

jest.mock("../app/components/Navbar/Logo", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Logo</div>),
}));

describe("Navbar", () => {
  it("renders the logo component", () => {
    render(<Navbar />);
    expect(Logo).toHaveBeenCalled();
  });

  it("renders the search filters component", () => {
    render(<Navbar />);
    expect(SearchFilters).toHaveBeenCalled();
  });

  it("renders the user menu component", () => {
    render(<Navbar />);
    expect(UserMenu).toHaveBeenCalled();
  });
});
