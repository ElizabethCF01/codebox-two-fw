import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { IconGithub } from "../icons/IconGithub";
import { IconInstagram } from "../icons/IconInstagram";
import { IconLinkedin } from "../icons/IconLinkedin";

export default function FooterComponent() {
  return (
    <footer className="border-t bg-muted/40 px-4 md:px-8">
      <div className="container flex flex-col md:flex-row justify-between items-center py-10 gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Codebox</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Components
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Challenges
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Creators
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button type="button" className="btn btn-sm btn-ghost btn-circle">
              <IconGithub className="h-5 w-5" />
            </button>
            <button type="button" className="btn btn-sm btn-ghost btn-circle">
              <IconInstagram className="h-5 w-5" />
            </button>
            <button type="button" className="btn btn-sm btn-ghost btn-circle">
              <IconLinkedin className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          © 2025 Codebox. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
