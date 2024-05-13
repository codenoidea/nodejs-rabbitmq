var express = require("express");
var router = express.Router();
// var amqp = require("amqplib/callback_api");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

var amqp = require("amqplib");
async function connect(queue, text) {
  (async () => {
    let connection;
    try {
      // 도커 이미지 내부 접속시 host.docker.internal
      connection = await amqp.connect(
        "amqp://guest:guest@host.docker.internal:5672"
      );
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
      console.log(" [x] Sent '%s'", text);
      await channel.close();
    } catch (err) {
      console.warn(err);
    } finally {
      if (connection) await connection.close();
    }
  })();
}

router.get("/send", async (req, res, next) => {
  const queue = req.query.queue;
  const text = {
    item_id: new Date().getTime(),
    text: req.query.text,
  };
  connect(queue, text);

  res.render("index", { title: `${queue}, ${text}` });
});

module.exports = router;
