const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(cors({
  origin: 'http://localhost:3001', // React 앱의 주소
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!')
    console.log(`📋 Database URL: ${process.env.MONGODB_URI}`)
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패!')
    console.error('🚫 에러 내용:', err.message)
    process.exit(1)  // MongoDB 연결 실패시 서버 종료
  });

// 테스트를 위한 간단한 라우트
app.get('/', (req, res) => {
  res.send('이규형은 3000억을 번다.서버가 정상적으로 실행중입니다.');
});

app.get('/api', (req, res) => {
  res.json({ message: '안녕하세요! API가 작동중입니다.' });
});

// 라우터 연결
const guestbookRoutes = require('./routes/guestbook.routes');
app.use('/api/guestbook', guestbookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
}); 