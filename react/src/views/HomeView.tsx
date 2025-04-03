import { useEffect, useState } from "react";
import { useProject } from "../hooks/useProject";
import { Project } from "../interfaces/project";
import { useAuthStore } from "../stores/auth";
import { Tag } from "../interfaces/tag";
import { Filter, PlusCircle } from "lucide-react";
import { Link } from "react-router";
import ProjectCardSkeleton from "../components/cards/ProjectCardSkeleton";
import ProjectCard from "../components/cards/ProjectCard";
import { useTag } from "../hooks/useTag";

export default function HomeView() {
  const { getProjectList } = useProject();
  const { getTagList } = useTag();
  const authStore = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [tag, setTag] = useState("all");

  const handleLoadMore = async (nextPage: number) => {
    setIsLoading(true);
    let query = "";
    if (tag !== "all") {
      query = `&filters[tag][documentId][$eq]=${tag}`;
    }
    
    const response = await getProjectList(nextPage, query);
    
    setProjects((prevProjects) => nextPage === 1 ? response.list : [...prevProjects, ...response.list]);
    setHasMore(response.hasMore);
    setPage(nextPage);
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
        const tags = await getTagList()
        setTagList(tags)
    }
    getData();
  }, []);

  useEffect(() => {
    setProjects([]);
    handleLoadMore(1);
   
  }, [tag]);
  


  return (
    <main className="flex-1 p-4 lg:p-10 flex flex-col items-center">
    <section
      className="py-12 w-full md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/80 to-background flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 pb-8">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Open Source UI Components
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Beautiful UI Components for Your Next Project
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl text-center text-pretty">
            Discover, copy and customize beautiful UI components. Save hours of development time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <Link
              to={authStore.user ? '/editor' : '/login'}
              className="gap-2 btn btn-wide btn-outline"
            >
              <PlusCircle className="h-4 w-4" />
              Submit Component
            </Link>
            <button className="gap-2 btn btn-wide btn-primary">Browse Components</button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-8 w-full justify-center flex">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full"
        >
          <div role="tablist" className="tabs tabs-box">
            <button
              className={`tab ${ tag === 'all' ? 'tab-active' : '' }`}
              onClick={ () => setTag('all') }
            >
              All
            </button>
            {tagList.map((it) => (
                <button
                key={it.id}
                role="tab"
                className={`tab ${ it.documentId ===  tag ? 'tab-active' : '' }`}
                onClick={ () => setTag(it.documentId) }
              >
                {it.name }
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="gap-2 btn btn-outline">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          { projects.map((project) => <ProjectCard  key={project.id} project={project} />)}
          {isLoading && <ProjectCardSkeleton  />}
        </div>

       {hasMore && !isLoading && <div  className="flex justify-center mt-12">
          <button onClick={() => handleLoadMore(page + 1)} className="gap-2 btn btn-outline btn-wide">
            Load More Components
          </button>
        </div>}
      </div>
    </section>
  </main>
  );
}

