# 邓松个人主页维护说明

这是一个无需构建工具的 GitHub Pages 静态主页。页面风格参考高校教师常用的学术主页模式：左侧个人信息，右侧分节展示简介、动态、论文、项目、专利、学术服务、获奖与标准。

## 文件结构

- `index.html`：页面结构，一般不需要经常修改。
- `styles.css`：页面样式，控制字体、布局、颜色、移动端适配。
- `script.js`：把 `data/profile.js` 中的数据渲染到页面。
- `data/profile.js`：主页内容数据，后期维护最常改这个文件。
- `images/profile-photo.png`：个人照片。
- `_config.yml`：GitHub Pages 的基础站点信息。

## 最常用的维护方式

绝大多数新增、删除、修改信息都在 `data/profile.js` 中完成。这个文件是一个 JavaScript 对象，基本格式如下：

```js
window.PROFILE = {
  news: [
    { period: "2026.06", tags: ["IEEE TETCI", "Accepted"], title: "新闻内容" }
  ],
  publications: [
    { year: "2026", tags: ["Journal"], citation: "论文引用格式" }
  ],
  projects: [
    { period: "2026.1-2028.12", tags: ["项目类别"], title: "项目名称，编号，经费，状态，角色" }
  ],
  patents: [
    { tags: ["授权"], title: "专利名称(专利号)" }
  ]
};
```

注意：每一项之间要用英文逗号 `,` 分隔；字符串要放在英文引号 `"..."` 中。

## 添加 News

在 `news` 数组最前面增加一项：

```js
{
  period: "2026.06",
  tags: ["IEEE TETCI", "Accepted"],
  title: "论文 “FedSTAFN: A Secure and Efficient Privacy-Preserving Federated Learning Model for Electricity Theft Detection” 已被 IEEE Transactions on Emerging Topics in Computational Intelligence 接收。"
}
```

如果 `news` 数组里已经有一条内容，新增第二条时，两条之间必须加英文逗号：

```js
news: [
  {
    period: "2026.06",
    tags: ["IEEE TETCI", "Accepted"],
    title: "第一条新闻"
  },
  {
    period: "2026.09",
    tags: ["IEEE TIP", "Accepted"],
    title: "第二条新闻"
  }
]
```

删除 News 时，删除对应的 `{ ... }` 对象即可。

## 添加论文

在 `publications` 数组中加入：

```js
{
  year: "2026",
  tags: ["Journal", "IEEE"],
  citation: "Deng Song, Author B. Paper title[J]. Journal Name, 2026, volume(issue): pages."
}
```

常用 `tags` 可写：`Journal`、`Conference`、`SCI`、`EI`、`CCF-A`、`CCF-B`、`A1`、`A2` 等。页面会自动生成年份筛选和搜索。

## 添加科研项目

在 `projects` 数组中加入：

```js
{
  period: "2026.1-2028.12",
  tags: ["国家自然科学基金"],
  title: "项目名称，项目编号，经费，状态，主持"
}
```

## 添加专利

在 `patents` 数组中加入：

```js
{
  tags: ["授权"],
  title: "发明人. 专利名称(专利号)"
}
```

## 添加获奖或标准

获奖放入 `awards`：

```js
{ tags: ["奖项名称"], title: "成果名称，获奖时间" }
```

标准放入 `standards`：

```js
{ tags: ["团体标准"], title: "标准名称，发布单位，时间" }
```

## 修改个人简介、研究方向和链接

- 个人简介：修改 `summary.long`。
- 首页统计数字：修改 `metrics`。
- 研究方向：修改 `researchInterests`。
- Google Scholar、GitHub 等链接：修改 `links`。
- 个人照片：替换 `images/profile-photo.png`，保持文件名不变即可。

## 本地检查

修改后建议运行：

```powershell
node --check .\data\profile.js
node --check .\script.js
```

也可以直接打开本地 `index.html` 或使用一个本地静态服务器预览。

## 发布到 GitHub Pages

在仓库目录执行：

```powershell
git status
git add .
git commit -m "Update homepage content"
git push origin main
```

推送后访问：

https://dsylc2006.github.io/Homepage/

GitHub Pages 有时会有几十秒到几分钟缓存。若页面没立刻变化，稍后刷新即可。
