import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom ne fournit ni canvas ni Notification : on pose le minimum pour
// que les composants qui les touchent restent testables.
HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
