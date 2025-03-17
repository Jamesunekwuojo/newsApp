import express from "express";
import { getNews, getnewsID, createNews, deleteNews, getnewsTag, likeNews } from "../controller/newsController.js";


const router = express.Router()

router.get('/:id', getnewsID)

router.get('/', getNews)

router.post('/newsTag', getnewsTag)

router.post('/', createNews)

router.post('/newsLike', likeNews )


export default router