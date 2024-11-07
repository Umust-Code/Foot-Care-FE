import { clientApi } from 'api/clientApi';
import { API_POSTS, API_POSTS_CATEGORY } from 'api/constant';
import { Posts } from 'api/models/response';

async function getPosts() {
  try {
    const res = await clientApi.get<Posts>(API_POSTS);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getPostsByCategory(categoryId: number) {
  try {
    const res = await clientApi.get<Posts>(`${API_POSTS_CATEGORY}/${categoryId}`);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export { getPosts, getPostsByCategory };
