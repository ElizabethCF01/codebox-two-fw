import { CirclePlay, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CodeEditor from "../components/editor/CodeEditor";
import ModalComponent from "../components/shared/ModalComponent";
import { useProject } from "../hooks/useProject";
import { useTag } from "../hooks/useTag";
import type { Tag } from "../interfaces/tag";
import { useAuthStore } from "../stores/auth";

export default function EditorView() {
  const user = useAuthStore((state) => state.user);
  const { createProject, getProjectById } = useProject();
  const { getTagList } = useTag();
  const navigate = useNavigate();
  const { id } = useParams();
  const [output, setOutput] = useState("");
  const [projectName, setProjectName] = useState("");
  const [code, setCode] = useState({
    html: "<h1>hello world!</h1>",
    css: "body{ background: #1c1917;} \nh1 { color: white; }",
    javascript: 'console.log("hello world");',
  });
  const [language, setLanguage] = useState<"html" | "css" | "javascript">(
    "html",
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOutput = () => {
    setOutput(`
    ${code.html}
    <style>
     body {
      overflow: hidden;
      background-color: #292524;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    ${code.css}
    </style>
   <script>
    ${code.javascript}
    </script>`);
  };

  const getProject = async () => {
    setIsLoading(true);
    const data = await getProjectById(id as string);
    if (data) {
      setCode({
        html: data.htmlCode,
        css: data.cssCode,
        javascript: data.jsCode,
      });
      setOutput(`
        ${data.htmlCode}
        <style>
         body {
         overflow: hidden;
         background-color: #292524;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         }
       ${data.cssCode}</style>
        <script>${data.jsCode}</script>
      `);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const tags = await getTagList();
      setTags(tags);
      handleOutput();
    };
    if (id) getProject();
    else getData();
  }, [id]);

  const pickTag = (tag: Tag) => {
    setTag(tag.documentId);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setShowModal(false);

    const data = {
      name: projectName,
      htmlCode: code.html,
      cssCode: code.css,
      jsCode: code.javascript,
      tag: { connect: [tag] },
      author: {
        connect: [
          {
            id: user.id,
            documentId: user.documentId,
          },
        ],
      },
    };

    const ok = await createProject({ data });
    setIsSaving(false);
    if (ok) navigate("/");
  };

  return (
    <>
      <div className="editor w-full h-[calc(100vh-70px)]">
        {isLoading ? (
          <div className="flex w-full items-center justify-center flex-1">
            <span className="loading loading-spinner loading-sm" />
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden aspect-16/9 bg-stone-900">
            <div className="h-[calc(100vh-70px)] w-full flex flex-col bg-stone-800 border-r border-white/40">
              <div className="p-2 gap-2 flex items-center">
                <div role="tablist" className="tabs tabs-box">
                  <button
                    role="tab"
                    type="button"
                    className={`tab ${language === "html" ? "tab-active" : ""}`}
                    onClick={() => setLanguage("html")}
                  >
                    HTML
                  </button>
                  <button
                    role="tab"
                    type="button"
                    className={`tab ${language === "css" ? "tab-active" : ""}`}
                    onClick={() => setLanguage("css")}
                  >
                    CSS
                  </button>
                  <button
                    role="tab"
                    type="button"
                    className={`tab ${
                      language === "javascript" ? "tab-active" : ""
                    }`}
                    onClick={() => setLanguage("javascript")}
                  >
                    JS
                  </button>
                </div>
                <div className="ml-auto" />
                {!id && (
                  <button
                    onClick={() => setShowModal(true)}
                    type="button"
                    className="btn btn-outline font-bold"
                    data-test-id="save-project"
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    Save
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleOutput}
                  className="btn btn-primary font-bold"
                >
                  <CirclePlay className="h-5 w-5" />
                  Run
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="h-full w-full py-4 font-mono text-lg bg-[#1e1e1e]">
                  <CodeEditor
                    value={code[language]}
                    language={language}
                    onChange={(value) =>
                      setCode((prev) => ({
                        ...prev,
                        [language]: value,
                      }))
                    }
                    handleOutput={handleOutput}
                  />
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-70px)] flex flex-col w-full">
              <iframe
                className="ide w-full h-full bg-stone-900 transition-all ease-in"
                srcDoc={output}
                sandbox="allow-scripts"
                aria-label="Codebox project"
                title="Codebox project"
              />
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ModalComponent title="Save Project" close={handleSave}>
          <div className="form-control mt-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              className="input w-full"
            />
          </div>
          <div className="form-control mt-4 flex gap-2">
            <div className="badge-primary badge-secondary badge-error badge-info hidden" />
            {tags.map((it) => (
              <button
                key={it.documentId}
                type="button"
                onClick={() => pickTag(it)}
                className={`badge cursor-pointer ${`badge-${it.variant}`} ${
                  tag === it.documentId ? "" : "badge-outline"
                }`}
              >
                {it.name}
              </button>
            ))}
          </div>
        </ModalComponent>
      )}
    </>
  );
}
