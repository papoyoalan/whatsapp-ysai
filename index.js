const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    // replace the values below from the values you copied above
    const from = '101383782809725';
    const token = 'EAARG0hF2JCoBAALjahCIqnTdKECh4JL7iFkmziCiIJQxMtkR4beacOZAX5IELtiasGC7sFC9BxLGVx9Y9bfg738liGB3NSdZAsl5mqkifxK26JnPeMZBPGbNZAhZC1HmpYNZBHhpWS0aZCeiC2cIyuVtQt1fNmFwzcMgi68z1C8y58qUh4DvZBYU';
    const to = '6287780021801'; // your phone number without the leading '+'
    const webhookVerifyToken = 'ysai.official'; // use a random value, e.g. 'bju#hfre@iu!e87328eiekjnfw'

    const bot = createBot(from, token);

    const result = await bot.sendText(to, 'Starting Webhook...');

    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      webhookVerifyToken,
      port: process.env.PORT,
    });

    // Listen to ALL incoming messages
    bot.on('message', async (msg) => {
      console.log(msg);

      if (msg.type === 'text')
      {
        await bot.sendList(msg.from, 'Menu', 'Selamat datang di WhatsApp Official *Yayasan Surya Alam Indonesia*. Salam silaturahim, ini adalah balasan otomatis dari sistem kami. Untuk mengetahui tentang kami silahkan pilih menu berikut!',
        {
          ['Tentang Program']: [
            {id: 'santunan', title: 'Santunan Yatim-Dhuafa', description: 'Yatim Bahagia Indonesia Sejahtera'},
            {id: 'wakaf-quran', title: 'Wakaf Al Quran', description: 'Sebar Al Quran Sebar Kebaikan'},
            {id: 'istana-yatim', title: 'Istana Yatim YSAI', description: 'Pembangunan Panti Pesantren Yatim'},
            {id: 'patoy-toga', title: 'YSAI menuju Intansari', description: 'Integrasi Pertanian Desa Mandiri'},
            {id: 'ksas', title: 'KSAS Untuk UMKM', description: 'Koperasi Surya Alam Indonesia'}
          ]
        });
      } else if (msg.type === 'unsupported') {
        await bot.sendText(msg.from, 'Pesan Anda tidak terbaca oleh sistem kami, mohon ulangi kembali. Terima kasih...');
      } else if (msg.data.id === 'santunan') {
        await bot.sendTemplate(msg.from, 'santunan', 'id', [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link": "https://drive.google.com/uc?export=download&id=186DdPk9QQz_YR5NoxxY8EnVfpE22nppO"
                }
              }
            ]
          }
        ]);
      } else if (msg.data.id === 'istana-yatim') {
        await bot.sendTemplate(msg.from, 'wakaf_sikasur', 'id', [
          {
            "type": "header",
            "parameters": [
              {
                "type": "video",
                "video": {
                  "link": "https://drive.google.com/uc?export=download&id=1SyhqWgzPR-aGpkObYtuQNu7Hoh0gQCYr"
                }
              }
            ]
          }
        ]);
      } else if (msg.data.id === 'wakaf-quran') {
        await bot.sendTemplate(msg.from, 'wakaf_quran', 'id', [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link": "https://drive.google.com/uc?export=download&id=1pUjv6aYuHHc7AUDr8Y1lfA6gsvql1I82"
                }
              }
            ]
          }
        ]);
      } else if (msg.data.id === 'ksas') {
        await bot.sendTemplate(msg.from, 'ksas', 'id');
      }
    });
  } catch (err) {
    console.log(err);
  }
})();