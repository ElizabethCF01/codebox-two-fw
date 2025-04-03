import type { StrapiErrorResponse } from '@/interfaces/error'
import type { Tag, TagsResponse } from '@/interfaces/tag'
import type { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'
import axiosClient from '@/lib/axios'

export const useTag = () => {
  const getTagList = async () => {
    let res: Tag[] = []
    try {
      const response = await axiosClient.get<TagsResponse>('tags?populate=*')
      console.log(response)
      if (response) {
        console.log(response.data.data)
        res = response.data.data
      }
    } catch (error) {
      console.log(error)
      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error?.message ||
          'Some Error occurred try again!',
      )
    }
    return res
  }
  return { getTagList }
}
