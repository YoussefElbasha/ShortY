import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import generateShortUrl from '../lib/generate-short-url'

const postUrl = async (req: Request, res: Response) => {
  try {

    const url = req.body.url
    const prisma = new PrismaClient()
    let shortUrl = ''
    let flag = false

    do {

      flag = false

      shortUrl = generateShortUrl()

      const checkIfUnique = await prisma.url.findUnique({
        where: {
          shortenedUrl: shortUrl
        }
      })

      if (checkIfUnique?.shortenedUrl === shortUrl) flag = true

    } while (flag);

    const saveUrl = await prisma.url.create({
      data: {
        shortenedUrl: shortUrl,
        originalURl: url
      }
    })

    return res.status(200).json({ "shortUrl": `Shorty.com/${shortUrl}` })
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export default postUrl