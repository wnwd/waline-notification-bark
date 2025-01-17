# waline-notification-bark

A [Waline](https://waline.js.org/) plugin that provide [**Bark**](https://bark.day.app/) spport.

[中文文档](./README_CN.md) | English Doc

## How to install
```shell
npm install waline-notification-bark
```

## How to use
Edit your Waline File:

indes.js
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
Add `"waline-notification-bark": "latest"` into `package.json` dependencies.


## Environment Variables
- `BARK_WEBHOOK`: Bark group bot webhook URL, support official services and self-deployment. e.g. `https://api.day.app/iuhvbbGuifh4hDth368`
- `SITE_NAME`: Your site name, used for display in notification message.
- `SITE_URL`: Your site URL, used for display in notification message.
- `BARK_LEVEL`: (optional) Push interruption level. `active`: default value, the system will immediately light up the screen to display the notification, `timeSensitive`: time-sensitive notification, which can be displayed in the focused state, `passive`: only add the notification to the notification list, and will not light up the screen to remind you.
- `BARK_ICON`: (optional) Set a custom icon for push notifications, default value is `https://waline.js.org/logo.png`.
- `BARK_SOUND`: (optional) You can set different ringtones for push notifications. The default ringtone is `minuet.caf`.
- `BARK_TITLE_TEMPLATE`: (Optional) Title template. The default value is `{{self.name}} 有新评论啦`, which is used to display the title in the notification message.
- `BARK_TEMPLATE`: (optional) Your custom notification template, please refer [this document](https://waline.js.org/en/guide/features/notification.html#notification-template).

The default template as below:
```js
【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}
```

You need **redeploy** after change environment variables.