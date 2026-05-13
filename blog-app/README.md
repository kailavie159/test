# 📝 Blog App — Vercel Serverless

Blog cá nhân đơn giản với tính năng **đăng bài** và **xoá bài**, chạy trên Vercel Serverless Functions.

## 🗂 Cấu trúc dự án

```
blog-app/
├── api/
│   └── posts.js        # Serverless API (GET / POST / DELETE)
├── public/
│   └── index.html      # Frontend giao diện
├── vercel.json         # Cấu hình Vercel
├── package.json
└── .gitignore
```

## 🚀 Cách deploy lên GitHub + Vercel

### Bước 1 — Đưa code lên GitHub

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### Bước 2 — Deploy lên Vercel

**Cách 1: Qua giao diện web (dễ nhất)**
1. Vào [vercel.com](https://vercel.com) → **New Project**
2. Import repo vừa tạo từ GitHub
3. Nhấn **Deploy** → xong!

**Cách 2: Qua CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Bước 3 — Chạy local để test

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

## 📡 API Endpoints

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/posts` | Lấy tất cả bài viết |
| POST | `/api/posts` | Đăng bài mới |
| DELETE | `/api/posts?id=xxx` | Xoá bài theo ID |

### POST body (JSON)
```json
{
  "title": "Tiêu đề bài viết",
  "content": "Nội dung bài viết...",
  "author": "Tên tác giả"
}
```

## ⚠️ Lưu ý

> Serverless Functions trên Vercel **không lưu dữ liệu vĩnh viễn** giữa các request (in-memory).  
> Để lưu dữ liệu thật, kết nối tới database như:
> - [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis)
> - [Supabase](https://supabase.com) (PostgreSQL)
> - [PlanetScale](https://planetscale.com) (MySQL)
