import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";

// Generated components use `data-ocid` for test hooks.
configure({ testIdAttribute: "data-ocid" });

// `motion` (framer-motion) uses IntersectionObserver for whileInView animations,
// which jsdom does not implement.
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ??
  (IntersectionObserverMock as unknown as typeof IntersectionObserver);

// `motion` also reads matchMedia for reduced-motion preferences.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
