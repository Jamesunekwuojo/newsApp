import { uploadToCloudinary } from "../utilis/cloudinary.js";


// Get paginated News
export const getNews = async () => {

    const { page = 1, limit = 3 } = req.query;
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }

}

// Get news by ID
export const getnewsID = async () => {

    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ error: 'News not found' });
        news.views += 1;
        await news.save();
        res.json(news);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }

}

// Get news by Tag
export const getnewsTag = async() => {

    try {
        const news = await News.find({ tags: req.params.tag });
        res.json(news);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
    
}

// Create news
export const createNews = async() => {

    try {
        const { title, text, tags, images } = req.body;
        const uploadedImages = await Promise.all(images.map(img => uploadToCloudinary(img)));
        const news = new News({ title, text, tags, images: uploadedImages });
        await news.save();
        res.status(201).json(news);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
    
}

// Like News
export const likeNews = async() => {

    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ error: 'News not found' });
        news.likes += 1;
        await news.save();
        res.json({ likes: news.likes });
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }

    
}

// elete News
export const deleteNews = async() => {

  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }

    
}

