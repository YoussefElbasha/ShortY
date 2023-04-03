import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const deleteUrl = async (req: Request, res: Response) => {
  try {

    const { shortUrl } = req.params
    const prisma = new PrismaClient()

    const checkIfUrlExists = await prisma.url.findUnique({
      where: {
        shortenedUrl: shortUrl
      }
    })

    if (!checkIfUrlExists) {
      throw new Error('The Url selected for deletion does not exist')
    }

    const deleteUrl = await prisma.url.delete({
      where: {
        shortenedUrl: shortUrl
      }
    })

    return res.status(200).json({ "message": 'The url has been deleted successfully', "shortUrlCode": `${deleteUrl.shortenedUrl}` })
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export default deleteUrl