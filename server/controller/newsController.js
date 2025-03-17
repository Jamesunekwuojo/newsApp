import { uploadToCloudinary } from "../utilis/cloudinary.js";
import { News } from "../models/News.js";

// Get paginated News
export const getNews = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};




// Get news by ID
export const getnewsID = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    news.views += 1;
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get news by Tag
export const getnewsTag = async(req, res) => {
  try {
    const news = await News.find({ tags: req.params.tag });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create news
// export const createNews = async (req, res) => {
//   try {
//     const { title, text, tags} = req.body;
//     console.log(req.body)
//     const uploadedImages = await Promise.all(
//       req.files.map((file) => uploadToCloudinary(file.buffer.toString("base64")))
      
//     );
//     console.log(req.files)
//     const news = new News({ title, text, tags:tags.split(","),  images: uploadedImages });

//     await news.save();
//     res.status(201).json(news);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Server error" });
//   }
// };

export const createNews = async (req, res) => {
  try {
    const { title, text, tags, image } = req.body;
    console.log("Received Data:", req.body);

    if (!image) return res.status(400).json({ error: "No image provided" });

    const uploadedImage = await uploadToCloudinary(image);
    const news = new News({ title, text, tags, images: [uploadedImage] });

    await news.save();
    console.log("News created successfully...", news)

    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// Like News
export const likeNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    news.likes += 1;
    await news.save();
    res.json({ likes: news.likes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// delete News
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
