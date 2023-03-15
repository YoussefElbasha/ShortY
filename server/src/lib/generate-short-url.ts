const generateShortUrl = (): string => {
  const possibleValues: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result: string = ''

  for (let i = 0; i < 6; i++) {
    result += possibleValues[Math.floor(Math.random() * possibleValues.length)]
  }

  return result
}
export default generateShortUrl
