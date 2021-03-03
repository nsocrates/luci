const { PrismaClient } = require('@prisma/client')
const { handleError, respondWithResult } = require('../../services')
const prisma = new PrismaClient()

// GET to list all users
exports.list = async function (req, res) {
  try {
    const users = await prisma.user.findMany()
    return respondWithResult(res, 200)(users)
  } catch (error) {
    return handleError(res, 500)(error)
  }
}
