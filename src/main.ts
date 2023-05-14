import { memphis, Memphis, Message } from 'memphis-dev';

async function startConsumer() {
  let memphisConnection: Memphis;
  let counter = 0;
  try {
    memphisConnection = await memphis.connect({
      host: process.env.MEMPHIS_HOST,
      username: process.env.MEMPHIS_USERNAME,
      connectionToken: process.env.PASS,
    });
    const consumer = await memphisConnection.consumer({
      stationName: 'demo-40k',
      consumerName: 'consumer',
      consumerGroup: 'cg40k',
      genUniqueSuffix: true,
      maxAckTimeMs: 60000,
      maxMsgDeliveries: 1,
    });
    consumer.on('message', (message: Message) => {
      counter++;
      console.log('counter: ' + counter);
      // console.log(message.getData().toString());
      message.ack();
    });

    consumer.on('error', (error) => {
      console.log(error);
    });
  } catch (ex) {
    console.log(ex);
    if (memphisConnection !== undefined) memphisConnection.close();
  }
}
startConsumer();
