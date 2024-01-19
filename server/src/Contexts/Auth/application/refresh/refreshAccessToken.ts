import { verifyRefreshToken, generateTokens } from '../utils/index.js'
import UserToken from '../models/UserToken.js'
import User from '../models/User.js'

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body

  try {
    const { tokenDetails, error } = await verifyRefreshToken(refreshToken)
    if (error) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const user = await User.findById(tokenDetails._id)
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' })
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user)

    // Remove the old refresh token from the database
    await UserToken.findOneAndDelete({ token: refreshToken })

    // Save the new refresh token in the database
    await new UserToken({ userId: user._id, token: newRefreshToken }).save()

    res.json({ accessToken, refreshToken: newRefreshToken })
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing access token' })
  }
}
