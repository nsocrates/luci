const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.handleError = (res, statusCode = 500) => (error) => {
  console.log(error.message || error)
  return res.status(statusCode).json({ message: error.message || error })
}

exports.respondWithResult = (res, statusCode = 200) => (entity) => {
  return entity
    ? res.status(statusCode).json(entity)
    : res.sendStatus(statusCode)
}

exports.userExists = async (userId) => {
  const id = parseInt(userId, 10)

  if (isNaN(id)) {
    return false
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return !!user
  } catch (error) {
    console.log(error.message || error)
    return false
  }
}
