import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ProjectCard from "../components/cards/ProjectCard";
import type { Project } from "../interfaces/project";

describe("ProjectCard", () => {
  it("should render project name", () => {
    const project = {
      id: 1,
      name: "Test Project",
      documentId: "test-doc",
      tag: { name: "Test Tag" },
      author: { name: "Test Author" },
    } as unknown as Project;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProjectCard project={project} />
      </MemoryRouter>,
    );

    const projectNameElement = screen.getByText("Test Project");
    expect(projectNameElement).toBeTruthy();
  });
});
