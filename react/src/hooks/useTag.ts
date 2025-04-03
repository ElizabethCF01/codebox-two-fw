import { Tag, TagsResponse } from "../interfaces/tag"
import { AxiosError } from "axios"
import axiosClient from '../lib/axios'
import { toast } from "react-toastify"
import { StrapiErrorResponse } from "../interfaces/error"

export const useTag = () => {
    const getTagList = async () => {
        let res: Tag[] = []
        try {
          const response = await axiosClient.get<TagsResponse>('tags?populate=*')
         
          if (response) {
           
            res = response.data.data
          }
        } catch (error) {
          console.error(error)
          toast.error(
            (error as AxiosError<StrapiErrorResponse>).response?.data?.error?.message ||
              'Some Error occurred try again!',
          )
        }
        return res
      }
    return {
        getTagList
    }
}