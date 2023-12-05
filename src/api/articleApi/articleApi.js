import { get, post } from '..';

/**
 * 新增文章
 * @param {userId:number,title:string,content:string,viewCount:integer,tags:List{id:number,name:string},isPublished:bool} article 
 * @returns 
 */
export async function addArticle (article) {
  return await post('/article/add', article)
}