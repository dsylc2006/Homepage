# 邓松个人主页

这是发布到 GitHub Pages 的静态个人主页，页面内容主要来自 `中文简历--邓松-V6.doc`。

## 如何更新内容

主要信息集中在 `data/profile.js`：

- `summary`：个人简介
- `metrics`：首页统计数字
- `experience`：工作经历
- `services`：学术服务
- `publications`：论文列表
- `projects`：科研项目
- `patents`：发明专利
- `awards`：获奖
- `standards`：标准

新增一篇论文时，在 `publications` 数组中增加一项：

```js
{ year: "2026", tags: ["Journal"], citation: "作者. 题目[J]. 期刊, 年份." }
```

删除项目、论文或专利时，直接删除对应数组里的对象即可。页面不需要构建工具，提交到 GitHub 后 GitHub Pages 会直接发布。
