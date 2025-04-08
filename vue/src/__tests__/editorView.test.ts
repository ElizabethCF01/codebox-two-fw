// Mock the Monaco Editor component
// This is necessary because the Monaco Editor is a complex component that may not work well in a test environment
// and we want to isolate the tests for the EditorView component.
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the Monaco Editor component
vi.mock("@/components/editor/CodeEditor.vue", () => ({
  default: {
    name: "CodeEditor",
    template: "<div data-testid='mock-monaco'></div>",
  },
}));
// Mock  vue-router
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: undefined,
    },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

import { cleanup, fireEvent, render, screen } from "@testing-library/vue";
import EditorView from "../views/EditorView.vue";

describe("Editor view", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    render(EditorView);
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it("should change language tab", async () => {
    // Find the CSS tab and click it
    const cssTab = screen.getByRole("tab", { name: "CSS" });
    await fireEvent.click(cssTab);

    // Make sure the tab is active
    expect(cssTab.classList.contains("tab-active")).toBe(true);
  });

  it("should open modal when save button is clicked", async () => {
    // Encuentra el botón de guardar y haz clic en él
    const saveButton = screen.getByTestId("save-project");
    await fireEvent.click(saveButton);

    const modal = screen.getByRole("dialog");
    // Check if the modal is in the document
    expect(modal).not.toBeNull();
  });
});
