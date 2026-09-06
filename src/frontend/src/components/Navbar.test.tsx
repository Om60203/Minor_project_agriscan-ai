import { Navbar } from "@/components/Navbar";
import { useThemeStore } from "@/hooks/useTheme";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("Navbar theme toggle", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "dark" });
    document.documentElement.classList.remove("dark");
  });

  it("toggles between dark and light mode and applies the class to the root", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", {
      name: /Switch to light mode/i,
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(toggle);
    expect(useThemeStore.getState().theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(
      screen.getByRole("button", { name: /Switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("persists the theme choice in the store", () => {
    render(<Navbar />);
    fireEvent.click(
      screen.getByRole("button", { name: /Switch to light mode/i }),
    );
    expect(useThemeStore.getState().theme).toBe("light");
  });
});
