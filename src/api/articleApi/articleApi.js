import { get, post } from '..';

/**
 * 新增文章
 * @param {userId:number,title:string,content:string,viewCount:integer,tags:List{id:number,name:string},isPublished:bool} article 
 * @returns 
 */
export async function addArticle (article) {
  return await post('/article/add', article)
}

/**
 * 获取全部article
 * @returns 
 */
export async function getArticles () {
  return await get('/article/all')
}

/**
 * 按id获取article
 * @param {string} id 
 * @returns 
 */
export async function getArticleById (id) {
  return await get('/article/get?id=' + id)
}

/**
 * 获取该用户的articles
 * @param {string} userId 
 * @returns 
 */
export async function getArticleUnderUser (userId) {
  return await get('/article/user?userId=' + userId)
}

/**
 * 获取热门文章
 * @returns 
 */
export async function getHotArticle () {
  return await get('/article/hot')
}

/**
 * 删除文章
 * @param {number} articleId 
 * @returns 
 */
export async function deleteArticle (articleId) {
  return await get('/article/delete?articleId=' + articleId)
}

/**
 * 新增文章
 * @param {id:number,userId:number,title:string,content:string,viewCount:integer,tags:List{id:number,name:string},isPublished:bool} article 
 * @returns 
 */
export async function updateArticle (article) {
  return await post('/article/update', article)
}
