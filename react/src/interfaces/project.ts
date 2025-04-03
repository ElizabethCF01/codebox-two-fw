import type { Pagination } from './pagination'
import type { Tag } from './tag'
import type { StrapiUserResponse } from './user'

export interface Project {
  id: number
  name: string
  htmlCode: string
  cssCode: string
  jsCode: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  author: StrapiUserResponse
  documentId: string
  tag: Tag
}
export interface ProjectRequest {
  data: {
    name: string
    htmlCode: string
    cssCode: string
    jsCode: string
    tag: {
      connect: string[]
    }
    author: {
      connect: Connect[]
    }
  }
}
export interface Connect {
  id: number
  documentId: string
}
export interface ProjectsResponse {
  data: Project[]
  meta: {
    pagination: Pagination
  }
}
export interface ProjectResponse {
  data: Project
}
