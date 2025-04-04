import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { StrapiErrorResponse } from "../interfaces/error";
import type { Tag, TagsResponse } from "../interfaces/tag";
import axiosClient from "../lib/axios";

export const useTag = () => {
  const getTagList = async () => {
    let res: Tag[] = [];
    try {
      const response = await axiosClient.get<TagsResponse>("tags?populate=*");

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
  return {
    getTagList,
  };
};
