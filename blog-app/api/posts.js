// api/posts.js - Vercel Serverless Function
// Uses Vercel KV (key-value store) or in-memory for demo
// For production: connect to a real DB (Supabase, PlanetScale, etc.)

let posts = [
  {
    id: "1",
    title: "Bài viết đầu tiên",
    content: "Chào mừng bạn đến với blog của tôi!",
    author: "Admin",
    createdAt: new Date().toISOString(),
  },
];

export default function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET /api/posts — lấy tất cả bài viết
  if (req.method === "GET") {
    return res.status(200).json({ success: true, posts });
  }

  // POST /api/posts — đăng bài mới
  if (req.method === "POST") {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Tiêu đề và nội dung là bắt buộc" });
    }

    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      author: author?.trim() || "Ẩn danh",
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    return res.status(201).json({ success: true, post: newPost });
  }

  // DELETE /api/posts?id=... — xoá bài viết
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu ID bài viết" });
    }

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bài viết" });
    }

    const deleted = posts.splice(index, 1)[0];
    return res
      .status(200)
      .json({ success: true, message: "Đã xoá bài viết", post: deleted });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
