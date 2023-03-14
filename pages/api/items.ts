import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceAccount from '../../take-my-stuff-f74a3-d475c5c4254b.json'


initializeApp({credential: cert(serviceAccount)})

const db = admin.firestore();

export default async function addItem(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    console.log('REQUEST>>>>>>>>>.', req.body)
    const data = {
        category: req.body.category,
        name: req.body.name,
        ownerId: req.body.uId    
    }
    console.log('DATA >>>>>>>', data)
    const newItem = await db.collection('items').add(data)

    res.status(200).json(newItem)
  }
  