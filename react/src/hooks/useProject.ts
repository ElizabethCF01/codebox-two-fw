import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { StrapiErrorResponse } from "../interfaces/error";
import type {
  Project,
  ProjectRequest,
  ProjectResponse,
  ProjectsResponse,
} from "../interfaces/project";
import axiosClient from "../lib/axios";

export const useProject = () => {
  const getProjectList = async (page = 1, query = "") => {
    let list: Project[] = [];
    let hasMore = true;
    try {
      const response = await axiosClient.get<ProjectsResponse>(
        `projects?pagination[page]=${page}&pagination[pageSize]=8&populate=*${query}`,
      );
      if (response) {
        list = response.data.data;
        if (
          response.data.meta.pagination.pageCount ===
          response.data.meta.pagination.page
        ) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error
          ?.message || "Some Error occurred try again!",
      );
    }
    return { list, hasMore };
  };

  const getProjectById = async (id: string) => {
    let res: Project | null = null;
    try {
      const response = await axiosClient.get<ProjectResponse>(
        `projects/${id}?populate=*`,
      );

      if (response) {
        res = response.data.data;
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error
          ?.message || "Some Error occurred try again!",
      );
    }
    return res;
  };
  const createProject = async (request: ProjectRequest) => {
    let allOk = false;
    try {
      const response = await axiosClient.post<ProjectResponse>(
        "projects/",
        request,
      );

      if (response) {
        toast.success("Project saved!");
        allOk = true;
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error
          ?.message || "Some Error occurred try again!",
      );
    }
    return allOk;
  };
  return {
    getProjectList,
    getProjectById,
    createProject,
  };
};
