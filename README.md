# tt的工作台

个人工作台的第一个模块 —— **待办清单**，一个可安装的 PWA（渐进式网页应用）。

## 功能

- ➕ 添加任务，可选设置截止日期
- ✅ 勾选完成 / 取消完成
- 🗑 删除单个任务、一键清除已完成
- 🔍 全部 / 待完成 / 已完成 三种筛选
- 📅 截止日期智能显示（今天 / 明天 / 已过期高亮）
- 💾 数据保存在浏览器 localStorage，关闭页面不丢失
- 📱 响应式布局，手机端体验良好
- 📲 支持 PWA，可添加到手机主屏幕、离线使用

## 本地运行

PWA 的 Service Worker 需要通过 HTTP 访问（`file://` 无法注册）。在项目目录下启动一个本地服务器即可：

```bash
cd tt-workbench
python3 -m http.server 8000
# 或
npx serve .
```

然后打开 <http://localhost:8000>。

> 用手机测试：让手机和电脑连同一 Wi-Fi，访问 `http://<电脑IP>:8000`，然后在浏览器菜单里选择「添加到主屏幕」。

## 文件结构

```
tt-workbench/
├── index.html              # 页面结构
├── style.css               # 样式（响应式 + 深色模式）
├── app.js                  # 业务逻辑 + localStorage
├── manifest.webmanifest    # PWA 清单
├── sw.js                   # Service Worker（离线缓存）
├── generate-icons.js       # 图标生成脚本（纯 Node，无依赖）
└── icons/                  # 生成的图标
```

## 重新生成图标

```bash
node generate-icons.js
```
