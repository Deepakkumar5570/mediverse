import {
  createCommunityPostRepository,
  getCommunityPostsRepository,
  getCommunityPostByIdRepository,
  getCommunityPostsByAuthorRepository,
  updateCommunityPostRepository,
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


type UpdateCommunityPostInput = {
  title: string;
  content: string;
  category: string;
};

export async function updateCommunityPostService(
  postId: string,
  authorId: string,
  input: UpdateCommunityPostInput,
) {
  return updateCommunityPostRepository(
    postId,
    authorId,
    input,
  );
}