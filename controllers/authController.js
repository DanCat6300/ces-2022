import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
  const { name, userna, password } = req.body

  if (!name || !username || !password) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ username })
  if (userAlreadyExists) {
    throw new BadRequestError('username already in use')
  }
  const user = await User.create({ name, username, password })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  })
}
const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ username }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const updateUser = async (req, res) => {
  const { username, name, lastName, location } = req.body
  if (!username || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.username = username
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }
