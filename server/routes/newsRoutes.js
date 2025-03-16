import express from "express";
import { getNews, getnewsID, createNews, deleteNews, getnewsTag, likeNews } from "../controller/newsController";


const router = express.Router()

router.get('/:id', getnewsID)

router.get('/news', getNews)

router.post('/newsTag', getnewsTag)

router.post('/news', createNews)

router.post('/newsLike', likeNews )


export default router