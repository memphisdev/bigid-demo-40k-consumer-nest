import { memphis, Memphis, Message } from 'memphis-dev';

async function startConsumer() {
  let memphisConnection: Memphis;
  let counter = 0;
  try {
    // memphisConnection = await memphis.connect({
    //   host: process.env.MEMPHIS_HOST,
    //   username: process.env.MEMPHIS_USERNAME,
    //   password: process.env.PASS,
    // });
    memphisConnection = await memphis.connect({
      host: 'localhost',
      username: 'root',
      password: 'memphis',
    });
    const consumer = await memphisConnection.consumer({
      stationName: 'demo-40k',
      consumerName: 'consumer',
      consumerGroup: 'cg40k',
      genUniqueSuffix: true,
    });
    consumer.setContext({ key: 'value' });
    consumer.on('message', (message: Message, context: object) => {
      counter++;
      console.log('counter: ' + counter);
      // console.log(message.getData().toString());
      message.ack();
      const headers = message.getHeaders();
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
