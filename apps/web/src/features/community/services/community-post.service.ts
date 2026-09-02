import {
  createCommunityPostRepository,
  getCommunityPostsRepository,
  getCommunityPostByIdRepository,
  getCommunityPostsByAuthorRepository,
} from "../repositories";

type CreateCommunityPostInput = {
  authorId: string;
  title: string;
  content: string;
  category?: string;
  status?: string;
};

export async function createCommunityPostService(
  input: CreateCommunityPostInput,
) {
  return createCommunityPostRepository(input);
}

export async function getCommunityPostsService() {
  return getCommunityPostsRepository();
}

export async function getCommunityPostByIdService(
  postId: string,
) {
  return getCommunityPostByIdRepository(postId);
}

export async function getCommunityPostsByAuthorService(
  authorId: string,
) {
  return getCommunityPostsByAuthorRepository(authorId);
}