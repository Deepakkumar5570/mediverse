import {
  createCommunityCommentRepository,
  getCommunityCommentsByPostRepository,
  getCommunityCommentByIdRepository,
  updateCommunityCommentRepository,
  deleteCommunityCommentRepository,
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


type UpdateCommunityCommentInput = {
  content: string;
};

export async function updateCommunityCommentService(
  commentId: string,
  authorId: string,
  input: UpdateCommunityCommentInput,
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

  const comment =
    await updateCommunityCommentRepository(
      commentId,
      authorId,
      {
        content,
      },
    );

  if (!comment) {
    throw new Error(
      "Answer not found or you are not allowed to edit this answer.",
    );
  }

  return comment;
}

export async function deleteCommunityCommentService(
  commentId: string,
  authorId: string,
) {
  const comment =
    await deleteCommunityCommentRepository(
      commentId,
      authorId,
    );

  if (!comment) {
    throw new Error(
      "Answer not found or you are not allowed to delete this answer.",
    );
  }

  return comment;
}