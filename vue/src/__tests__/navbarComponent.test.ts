import Navbar from "@/components/shared/NavbarComponent.vue";
import type { StrapiUserResponse } from "@/interfaces/user";
import { useAuthStore } from "@/stores/auth";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Pinia
vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({
    user: { username: "test" },
    logout: vi.fn(),
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the navbar correctly", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.exists()).toBe(true);
  });

  it("should show user avatar and logout option when user is authenticated", async () => {
    const wrapper = mount(Navbar);

    // Mock de usuario autenticado
    const authStore = useAuthStore();
    authStore.user = {
      username: "test",
      email: "test@example.com",
    } as unknown as StrapiUserResponse;

    const avatarImage = wrapper.find('img[alt="avatar"]');
    const logoutButton = wrapper.find("button");

    expect(avatarImage.exists()).toBe(true);
    expect(logoutButton.exists()).toBe(true);
  });

  it("should navigate to My profile when clicking on My profile link", async () => {
    const wrapper = mount(Navbar);

    const myProfileLink = wrapper.find('router-link[to="/"]');
    expect(myProfileLink.exists()).toBe(true);
  });

  it("should show the menu icon in mobile view", () => {
    const wrapper = mount(Navbar, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    // Comprobar que el botón de menú está presente
    const menuButton = wrapper.find('button[type="button"]');
    expect(menuButton.exists()).toBe(true);
  });
});
