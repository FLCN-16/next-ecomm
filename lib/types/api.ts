import type { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


type User = {
  ID: string;
  username: string;
  capabilities: string[];
  authToken: string;
}

export interface ApiRequest extends NextApiRequest {
  user: User,
  prisma: PrismaClient
}

export interface ApiResponse extends NextApiResponse {
  
}