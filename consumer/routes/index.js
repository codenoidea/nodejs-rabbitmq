var express = require("express");
var router = express.Router();
var amqp = require("amqplib");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

async function connect(queue) {
  (async () => {
    let connection;
    try {
      // 도커 이미지 내부 접속시 host.docker.internal
      connection = await amqp.connect(
        "amqp://guest:guest@host.docker.internal:5672"
      );
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: false });

      await channel.consume(
        queue,
        (message) => {
          if (message) {
            console.log(
              " [x] Received '%s'",
              JSON.parse(message.content.toString())
            );
          }
        },
        { noAck: true }
      );
    } catch (err) {
      console.warn(err);
    } finally {
      if (connection) await connection.close();
    }
  })();
}

router.get("/receive", async (req, res, next) => {
  const queue = req.query.queue;

  connect(queue);

  res.render("index", { title: `${queue}` });
});

module.exports = router;
