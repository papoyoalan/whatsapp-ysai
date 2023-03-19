const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    // replace the values below from the values you copied above
    const from = 'NOMOR_ID';
    const token = 'TOKEN';
    const to = 'NOMRO_WA'; // your phone number without the leading '+'
    const webhookVerifyToken = 'WEBHOOK_TOKEN'; // use a random value, e.g. 'bju#hfre@iu!e87328eiekjnfw'

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
          ],['Hubungi Admin']: [
            {id: 'chat-admin', title: 'Chat Admin', description: 'Mulai percakapan dengan admin kami'}
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
      } else if (msg.data.id === 'chat-admin') {
        await bot.sendText(msg.from, 'Salam silaturahim dari kami Yayasan Surya Alam Indonesia. Mohon maaf akun WhatsApp ini tidak bisa digunakan untuk percakapan dua arah. Silahkan hubungi Admin kami untuk memulai percakapan dengan cara klik link berikut https://sociabuzz.com/ysai_official', {
          preview_url: true
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
