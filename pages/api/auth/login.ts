import { randomBytes } from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { ApiRequest, ApiResponse } from "../../../lib/types/api"
import withMiddlewares from "../../../lib/middlewares"

const handle = async (req: ApiRequest, res: ApiResponse) => {
  const { login, password, remember } = req.body

  const user = await req.prisma.user.findUnique({
    where: { username: login },
    select: {
      ID: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      password: true,
      createdAt: true,
      updatedAt: true,
      user_role: {
        select: {
          capabilities: {
            select: { capabilityId: true },
          },
        },
      },
    },
  })
  if (!user) return res.status(401).json({ error: "Invalid credentials" })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" })

  const capabilities = user.user_role.capabilities.map((cap) => cap.capabilityId)

  const dayInSeconds = 60 * 60 * 24
  const expiresIn = dayInSeconds * (remember ? 7 : 1)
  const sessionToken = randomBytes(60).toString("hex")

  const userSession = await req.prisma.session.create({
    data: {
      sessionToken,
      userId: user.ID,
      expires: new Date(Date.now() + expiresIn * 1000),
    },
  })
  if (!userSession) return res.status(500).json({ error: "Internal server error" })

  const token = jwt.sign(
    {
      ID: user.ID,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      sessionToken,
    },
    process.env.JWT_SECRET!,
    { expiresIn }
  )
  if (!token) return res.status(500).json({ error: "Internal server error" })

  return res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    capabilities,
    token,
    expires: expiresIn,
  })
}

export default withMiddlewares(handle)
