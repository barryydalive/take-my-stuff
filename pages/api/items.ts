import admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'


admin.initializeApp({credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '')})

const db = admin.firestore();

export default async function addItem(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const data = {
        category: req.body.category,
        name: req.body.name,
        ownerId: req.body.uId    
    }
    const newItem = await db.collection('items').add(data)

    res.status(200).json(newItem)
  }
  