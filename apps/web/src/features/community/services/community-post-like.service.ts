import {
  createCommunityPostLikeRepository,
  deleteCommunityPostLikeRepository,
  getCommunityPostLikeCountRepository,
  getCommunityPostLikeRepository,
} from "../repositories";

export async function toggleCommunityPostLikeService(
  postId: string,
  userId: string,
) {
  const existingLike =
    await getCommunityPostLikeRepository(
      postId,
      userId,
    );

  if (existingLike) {
    await deleteCommunityPostLikeRepository(
      postId,
      userId,
    );

    return {
      liked: false,
      likeCount:
        await getCommunityPostLikeCountRepository(
          postId,
        ),
    };
  }

  await createCommunityPostLikeRepository(
    postId,
    userId,
  );

  return {
    liked: true,
    likeCount:
      await getCommunityPostLikeCountRepository(
        postId,
      ),
  };
}

export async function getCommunityPostLikeStatusService(
  postId: string,
  userId: string,
) {
  const [like, likeCount] = await Promise.all([
    getCommunityPostLikeRepository(
      postId,
      userId,
    ),
    getCommunityPostLikeCountRepository(postId),
  ]);

  return {
    liked: Boolean(like),
    likeCount,
  };
}

export async function getCommunityPostLikeCountService(
  postId: string,
) {
  return getCommunityPostLikeCountRepository(postId);
}