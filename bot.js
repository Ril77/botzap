const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function start() {

  const { state, saveCreds } = await useMultiFileAuthState("auth")

  const sock = makeWASocket({ auth: state })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { qr } = update
    if (qr) {
      qrcode.generate(qr, { small: true })
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {

    const m = messages[0]
    if (!m.message) return

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text

    if (!text) return

    if (text.toLowerCase().includes("comprar")) {

      await sock.sendMessage(m.key.remoteJid, {
        text: "Perfeito 🙂 clique aqui e finalize sua compra: https://asset-manager--rildobarbosaflp.replit.app/"
      })

    }

  })

}

start()

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot está rodando 🚀')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor web ativo')
})

