import { Request, Response } from 'express'

const getUrlShortener = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ "response": "hello" })
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export default getUrlShortener