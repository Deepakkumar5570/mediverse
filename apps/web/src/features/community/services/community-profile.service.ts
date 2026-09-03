import {
  getCommunityPostsByAuthorRepository,
} from "../repositories";

import {
  getCommunityCommentsByAuthorRepository,
} from "../repositories";

import {
  getCommunityPostLikeCountByAuthorRepository,
} from "../repositories";

import {
  getCommunityCommentLikeCountByAuthorRepository,
} from "../repositories";

export async function getCommunityProfileActivity(
  authorId: string,
) {
  const [
    posts,
    answers,
    postLikes,
    answerLikes,
  ] = await Promise.all([
    getCommunityPostsByAuthorRepository(authorId),
    getCommunityCommentsByAuthorRepository(authorId),
    getCommunityPostLikeCountByAuthorRepository(authorId),
    getCommunityCommentLikeCountByAuthorRepository(authorId),
  ]);

  return {
    posts,
    answers,
    stats: {
      postCount: posts.length,
      answerCount: answers.length,
      likeCount: postLikes + answerLikes,
    },
  };
}