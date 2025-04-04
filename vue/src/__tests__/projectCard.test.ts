import ProjectCard from "@/components/cards/ProjectCard.vue";
import type { Project } from "@/interfaces/project";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

describe("ProjectCard", () => {
  it("should render project name", () => {
    const project = {
      id: 1,
      name: "Test Project",
      documentId: "test-doc",
      tag: { name: "Test Tag" },
      author: { name: "Test Author" },
    } as unknown as Project;

    const wrapper = mount(ProjectCard, {
      props: {
        project,
      },
    });

    expect(wrapper.text()).toContain("Test Project");
  });
});
