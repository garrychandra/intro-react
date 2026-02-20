export type Post = {
  id: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  content: string;
  status: string;
  title: string;
  user: {
    name: string;
  },
  userId: string;
}

export type PostListResponse = GenericListResponse<Post>;

export type GenericListResponse<DataType> = {
  info: {
    count: number;
  },
  records: DataType[]
}

export type PostResponse = Post;

export type UserInfo = {
  email: string;
  id: string;
  name: string;
  role: string;
}

export type AsyncDataState = 'pending' | 'loading' | 'fulfilled' | 'error';