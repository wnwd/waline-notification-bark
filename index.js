const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

module.exports = {
  hooks: {
    async postSave(comment, parent) {
      const { BARK_WEBHOOK, SITE_NAME, SITE_URL, BARK_TEMPLATE ,BARK_LEVEL, BARK_ICON, BARK_SOUND ,BARK_TITLE_TEMPLATE} = process.env;

      if (!BARK_WEBHOOK) {
        return false;
      }

      comment.comment = comment.comment.replace(/(<([^>]+)>)/gi, '');

      const data = {
        self: comment,
        parent,
        site: {
          name: SITE_NAME,
          url: SITE_URL,
          postUrl: SITE_URL + comment.url + '#' + comment.objectId,
        },
      };
      
      const title_template = BARK_TITLE_TEMPLATE || `{{self.name}} 有新评论啦`;
      const title = nunjucks.renderString(title_template, data);

      const content_template = BARK_TEMPLATE || `【昵称】：{{self.nick}}
【邮箱】：{{self.mail}}
【内容】：{{self.comment}}
【地址】：{{site.postUrl}}`;
      const content = nunjucks.renderString(content_template, data);

      const msg = {
        title: title,
        body: content,
        badge: 1,
        sound: BARK_SOUND || "minuet.caf",
        icon: BARK_ICON || "https://waline.js.org/logo.png",
        level: BARK_LEVEL || "active",
      };

      try {
        const resp = await fetch(`${BARK_WEBHOOK}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(msg),
        }).then((resp) => resp.json());

        if (resp.code !== 200) {
          console.log('Bark notification FAILED:', JSON.stringify(resp));
        } else {
          console.log('Bark notification SUCCESS:', JSON.stringify(resp));
        }
      } catch (error) {
        console.error('Send Bark notification ERROR:', error);
      }
    },
  },
};