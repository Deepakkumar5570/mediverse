import {
  createCommunityCommentRepository,
  getCommunityCommentsByPostRepository,
  getCommunityCommentByIdRepository,
} from "../repositories";

type CreateCommunityCommentInput = {
  postId: string;
  authorId: string;
  content: string;
};

export async function createCommunityCommentService(
  input: CreateCommunityCommentInput,
) {
  const content = input.content.trim();

  if (!content) {
    throw new Error("Answer cannot be empty.");
  }

  if (content.length > 5000) {
    throw new Error(
      "Answer must be 5000 characters or less.",
    );
  }

  return createCommunityCommentRepository({
    postId: input.postId,
    authorId: input.authorId,
    content,
    status: "published",
  });
}

export async function getCommunityCommentsByPostService(
  postId: string,
) {
  return getCommunityCommentsByPostRepository(postId);
}

export async function getCommunityCommentByIdService(
  commentId: string,
) {
  return getCommunityCommentByIdRepository(commentId);
}