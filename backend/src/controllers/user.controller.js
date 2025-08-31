import User from "../models/User.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { options } from "../constants.js";

const accessAndRefreshTokenGenrator = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Something went wrong")
  }
}


const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body
  if ([email, fullName, password].some((data) => data?.trim() === "")) {
    throw new ApiError(400, "all fields are requerd")
  }
  const existedUser = await User.findOne({
    $or: [{ email }]
  })
  if (existedUser) {
    throw new ApiError(400, "user alredy existd")
  }
  const user = await User.create({
    fullName,
    email,
    password
  })
  const createUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createUser) {
    throw new ApiError(500, "something went wrong")
  }
  return res.status(200).json(new ApiResponse(200, createUser, "register successfuly"))
})


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!(email || password)) {
    throw new ApiError(400, "all fields are requerd")
  }
  const user = await User.findOne({
    $or: [{ email }]
  }).select("+password")
  if (!user) {
    throw new ApiError(404, "not found")
  }
  const isPassword = await user.isPasswordCorrect(password)
  if (!isPassword) {
    throw new ApiError(401, "Bad request")
  }
  const { accessToken, refreshToken } = await accessAndRefreshTokenGenrator(user._id)
  const loginUser = await User.findById(user._id).select("-password -refreshToken")

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loginUser, refreshToken, accessToken }, "login successfully"))
})

const currentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "successfully"))
})

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1
    }
  },
    {
      new: true
    })
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refereshToken", options)
    .json(new ApiResponse(200, {}, "logout successfully"))
})

export { registerUser, loginUser, currentUser, logOutUser };