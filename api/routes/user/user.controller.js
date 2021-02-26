const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ==================================================================
// Helpers
// ==================================================================
const handleError = (res, statusCode = 500) => error => {
  console.log(error.message)
  res.status(statusCode).send(error.message || error)
}

const respondWithResult = (res, statusCode = 200) => entity => {
  if (entity) {
    res.status(statusCode).json(entity)
  } else {
    handleError(res, 500)({ message: 'Entity not found' })
  }
}

// ==================================================================
// Controls
// ==================================================================

// POST to create user
exports.create = async function (req, res) {
  const { name, group, state } = req.body

  try {
    const user = await prisma.user.create({
      data: { name, group, state },
    })

    return respondWithResult(res, 201)(user)
  } catch (error) {
    return handleError(res, 500)(error)
  }
}

// GET to list all users
exports.list = async function (req, res) {
  try {
    const users = await prisma.user.findMany()
    return respondWithResult(res, 200)(users)
  } catch (error) {
    handleError(res, 500)(error)
  }
}

// GET to show a user
exports.show = async function (req, res) {
  const id = parseInt(req.params.id, 10)

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return respondWithResult(res, 404)({ message: 'User not found'})
    }

    return respondWithResult(res, 200)(user)
  } catch (error) {
    return handleError(res, 500)(error)
  }
}

// PUT to update a user
exports.update = async function (req, res) {
  const { name, group, state } = req.body
  const id = parseInt(req.params.id, 10)

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, group, state },
    })

    return respondWithResult(res, 202)(user)
  } catch (error) {
    return handleError(res, 500)(error)
  }
}

// DELETE to remove a user
exports.destroy = async function (req, res) {
  const id = parseInt(req.params.id, 10)

  try {
    await prisma.user.delete({ where: { id } })
    return res.sendStatus(204)
  } catch (error) {
    return handleError(res, 404)({ message: 'User does not exist' })
  }
}
