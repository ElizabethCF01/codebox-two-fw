import { Code, Heart } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "../../interfaces/project";

interface Props {
  project: Project;
}
export default function ProjectCard({ project }: Props) {
  const content = `
    ${project.htmlCode}
    <style>
    body {
      overflow: hidden;
      background-color: #292524;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
      ${project.cssCode}
    </style>
   <script>
      ${project.jsCode}
    </script> `;

  return (
    <div className="group project-card relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 ease-linear duration-200">
        <button
          type="button"
          className="h-8 w-8 backdrop-blur-sm btn btn-sm btn-circle btn-soft border-white bg-stone-900/50"
        >
          <Heart className="h-4 w-4" />
        </button>

        <Link
          to={`/preview/${project.documentId}`}
          className="h-8 w-8 backdrop-blur-sm btn btn-sm border-white btn-circle btn-soft bg-stone-900/50"
        >
          <Code className="h-4 w-4" />
        </Link>
      </div>

      <div className="aspect-[4/3] overflow-hidden bg-muted/50 dark:bg-muted/80 flex items-center justify-center">
        <iframe
          className="ide w-full h-full bg-stone-900 transition-all ease-in"
          srcDoc={content}
          sandbox="allow-scripts"
          aria-label="Codebox project"
          title="Codebox project"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{project.name}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              <div className="`mt-1 badge badge-outline  ${'badge-' + project.tag?.variant}`">
                {project.tag?.name}
              </div>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Heart className="mr-1 h-3.5 w-3.5 fill-current" />
            <span className="text-xs">{10}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-7 ring ring-offset-2 bg-stone-800 rounded-full">
                <img
                  src={`https://robohash.org/${project.author.email}.png`}
                  alt={project.author.username}
                />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              @{project.author.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
