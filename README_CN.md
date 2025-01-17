# waline-notification-bark

中文文档 | [English Doc](./README.md)

一个[Waline](https://waline.js.org/)插件，提供 [**Bark**](https://bark.day.app/) 通知功能。

## 如何安装
```shell
npm install waline-notification-bark
```

## 如何使用
编辑你的服务端 Waline 文件：

waline.js
```js
const Application = require('@waline/vercel');
const Bark = require('waline-notification-bark');

module.exports = Application({
  plugins: [Bark],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});
```

### package.json
把 `"waline-notification-bark": "latest"` 添加到 `package.json` 文件的依赖项中。


## 环境变量
- `BARK_WEBHOOK`：Bark的 webhook URL，支持官方服务和自部署，例如 `https://api.day.app/iuhvbbGuifh4hDth368`。
- `SITE_NAME`：你的站点名字，用来显示在通知消息中。
- `SITE_URL`：你的站点名字，用来显示在通知消息中。
- `BARK_LEVEL`：（可选）推送中断级别。`active`：默认值，系统会立即亮屏显示通知，`timeSensitive`：时效性通知，可在专注状态下显示通知，`passive`：仅将通知添加到通知列表，不会亮屏提醒。
- `BARK_ICON`：（可选）为推送设置自定义图标，默认值为`https://waline.js.org/logo.png`。
- `BARK_SOUND`：（可选）可以为推送设置不同的铃声，默认为`minuet.caf`。
- `BARK_TITLE_TEMPLATE`：（可选）标题模板，默认为`{{self.name}} 有新评论啦`，用来显示在通知消息中的标题。
- `BARK_TEMPLATE`：（可选）你可以自定义通知模板，请参考官方文档 [this document](https://waline.js.org/guide/features/notification.html#%E9%80%9A%E7%9F%A5%E6%A8%A1%E6%9D%BF)。

默认模板如下：
```js
【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}
```

在修改环境变量后，你需要 **重新部署** Waline服务端。