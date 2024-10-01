const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // 用于处理静态文件

const ASSET_URL = 'https://page.taw.us.kg';

// 处理 SW.js 文件
app.get('/sw.js', (req, res) => {
  res.redirect(`${ASSET_URL}/sw.js`);
});

// 处理登录请求
app.post('/login', async (req, res) => {
  const { loginUrl, username, password } = req.body;

  const loginResponse = await fetch(loginUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (loginResponse.ok) {
    const data = await loginResponse.json();
    res.json(data);
  } else {
    res.status(loginResponse.status).send('Login failed');
  }
});

// 默认处理所有其他请求
app.use((req, res) => {
  res.redirect(`${ASSET_URL}${req.path}`);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
