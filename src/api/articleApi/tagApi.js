import { get, post } from '..';

/**
 * 获取标签列表
 * @returns 
 */
export async function getTagList () {
  return await get('/tag/list')
}

/**
 * 新增标签
 * @param {string} name 
 */
export async function addTag (name) {
  return await post('/tag/add?name=' + name)
}