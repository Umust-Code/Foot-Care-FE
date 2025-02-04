import { clientApi } from 'api/clientApi';
import {
  API_POSTS,
  API_POSTS_CATEGORY,
  API_POSTS_COMMENT,
  API_USERS_LIKE,
  API_POSTS_TOP,
  API_COMMENTS_SEARCH,
  API_COMMENTS,
  API_TOKEN_TEST,
} from 'api/constant';
import { Post, Comment } from 'api/models/response';
import { AddComment, PutPost, AddPost } from 'api/models/request';

async function getPosts(postId: number) {
  try {
    const res = await clientApi.get<Post>(`${API_POSTS}/${postId}`);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getPostsByCategory(categoryId: number) {
  try {
    const res = await clientApi.get<Post[]>(`${API_POSTS_CATEGORY}/${categoryId}`);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getComment(postId: number) {
  try {
    const res = await clientApi.get<Comment[]>(`${API_POSTS_COMMENT}/${postId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function postComment(postId: number, memberId: number, comment: AddComment) {
  try {
    const res = await clientApi.post(
      `${API_POSTS_COMMENT}/${postId}?memberId=${memberId}`,
      comment,
    );
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function putComment(commentId: number, comment: AddComment) {
  try {
    const res = await clientApi.put(`${API_COMMENTS}/${commentId}`, comment);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function postAllComments(memberName?: string, commentContent?: string) {
  try {
    const res = await clientApi.post<Comment[]>(API_COMMENTS_SEARCH, {
      memberName: memberName === '' ? undefined : memberName,
      commentContent: commentContent === '' ? undefined : commentContent,
    });
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function likePost(postId: number, memberId: number) {
  try {
    const res = await clientApi.post(`${API_POSTS}/${postId}/like/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function unlikePost(postId: number, memberId: number) {
  try {
    const res = await clientApi.delete(`${API_POSTS}/${postId}/unlike/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getLikePost(memberId: number) {
  try {
    const res = await clientApi.get<Post[]>(`${API_USERS_LIKE}/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getIsLiked(postId: number, memberId: number) {
  try {
    const res = await clientApi.get<string>(`${API_POSTS}/${postId}/is-liked/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getTopPosts() {
  try {
    const res = await clientApi.get<Post[]>(API_POSTS_TOP);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function addPost(data: AddPost) {
  try {
    const res = await clientApi.post(API_POSTS, data);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function putPost(postId: number, data: PutPost) {
  try {
    const res = await clientApi.put(`${API_POSTS}/${postId}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function deletePost(postId: number) {
  try {
    const res = await clientApi.delete(`${API_POSTS}/${postId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function deleteComment(commentId: number) {
  try {
    const res = await clientApi.delete(`${API_COMMENTS}/${commentId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getToken() {
  try {
    const res = await clientApi.get(API_TOKEN_TEST);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export {
  getPosts,
  getPostsByCategory,
  getComment,
  postComment,
  likePost,
  unlikePost,
  getLikePost,
  getIsLiked,
  getTopPosts,
  addPost,
  putPost,
  deletePost,
  postAllComments,
  deleteComment,
  putComment,
  getToken,
};
