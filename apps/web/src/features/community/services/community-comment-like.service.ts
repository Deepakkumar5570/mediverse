import {
  createCommunityCommentLikeRepository,
  deleteCommunityCommentLikeRepository,
  getCommunityCommentLikeCountRepository,
  getCommunityCommentLikeRepository,
} from "../repositories";

export async function toggleCommunityCommentLikeService(
  commentId: string,
  userId: string,
) {
  const existingLike =
    await getCommunityCommentLikeRepository(
      commentId,
      userId,
    );

  if (existingLike) {
    await deleteCommunityCommentLikeRepository(
      commentId,
      userId,
    );

    return {
      liked: false,
      likeCount:
        await getCommunityCommentLikeCountRepository(
          commentId,
        ),
    };
  }

  await createCommunityCommentLikeRepository(
    commentId,
    userId,
  );

  return {
    liked: true,
    likeCount:
      await getCommunityCommentLikeCountRepository(
        commentId,
      ),
  };
}

export async function getCommunityCommentLikeStatusService(
  commentId: string,
  userId: string,
) {
  const [like, likeCount] = await Promise.all([
    getCommunityCommentLikeRepository(
      commentId,
      userId,
    ),
    getCommunityCommentLikeCountRepository(
      commentId,
    ),
  ]);

  return {
    liked: Boolean(like),
    likeCount,
  };
}

export async function getCommunityCommentLikeCountService(
  commentId: string,
) {
  return getCommunityCommentLikeCountRepository(
    commentId,
  );
}