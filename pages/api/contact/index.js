import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      return res.status(422).json({ message: 'Invalid input.' })
    }

    const newMessage = {
      email,
      name,
      message,
    }

    let client
    const CONNECTION_STRING = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.iseny.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

    try {
      client = await new MongoClient(CONNECTION_STRING, {
        useUnifiedTopology: true,
      }).connect()
    } catch (e) {
      return res
        .status(5000)
        .json({ message: e.message || 'Connection to database failed' })
    }

    const db = client.db()

    try {
      await db.collection('messages').insertOne(newMessage)
    } catch (e) {
      await client.close()
      return res
        .status(5000)
        .json({ message: e.message || 'Insert on database failed' })
    }

    await client.close()

    res.status(201).json({ message: 'Success!', newMessage })
  }
}

export default handler
