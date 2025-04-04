export interface Tag {
  id: number;
  name: string;
  documentId: string;
  variant: string;
}

export interface TagsResponse {
  data: Tag[];
}

export interface TagResponse {
  data: Tag;
}
