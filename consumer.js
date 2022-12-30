const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'queue1';
        channel.assertQueue(queueName, {
            durable: false
        });
        channel.consume(queueName, (message)=>{
            console.log(`received messgage: ${message.content.toString()}`);
            channel.ack(message);
        })
    })
})