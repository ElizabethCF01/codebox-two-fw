import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Mock the Monaco Editor component
// This is necessary because the Monaco Editor is a complex component that may not work well in a test environment
// and we want to isolate the tests for the EditorView component.
vi.mock("../components/editor/CodeEditor", () => ({
  default: () => <div data-testid="mock-monaco" />,
}));

import EditorView from "../views/EditorView";

describe("Editor view", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EditorView />
      </MemoryRouter>,
    );
  });
  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it("should change language tab", async () => {
    const cssTab = screen.getByRole("tab", { name: "CSS" });
    fireEvent.click(cssTab);
    // make sure the tab is active
    expect(cssTab.className.includes("tab-active")).toBe(true);
  });
  it("should open modal when save button is clicked", async () => {
    // Find the save button and click it
    const saveButton = screen.getByTestId("save-project");
    fireEvent.click(saveButton);
    const modal = screen.getByRole("dialog");
    // Check if the modal is in the document
    expect(modal).not.toBeNull();
  });
});
