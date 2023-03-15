import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const redirect = async (req: Request, res: Response) => {
  try {

    const { shortUrl } = req.params
    const prisma = new PrismaClient()

    const originalUrl = await prisma.url.findUnique({
      where: {
        shortenedUrl: shortUrl
      },
      select: {
        originalURl: true
      }
    })

    if (!originalUrl?.originalURl) {
      throw new Error("Sorry, this url does not exist")
    }

    return res.redirect(originalUrl?.originalURl)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export default redirect