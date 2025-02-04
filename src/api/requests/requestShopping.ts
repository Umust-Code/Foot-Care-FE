import { clientApi } from 'api/clientApi';
import { API_PRODUCT } from 'api/constant';
import { GroupProduct } from 'api/models/response';

async function getProduct() {
  try {
    const res = await clientApi.get<GroupProduct>(API_PRODUCT);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export { getProduct };
