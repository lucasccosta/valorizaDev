import { NextFunction, Request, Response } from "express"


export default function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
){
  // Verificar se o admin = true
  const admin = false

  if(admin){
    return next()
  }
  return response.status(401).json({
    error: "Unauthorized"
  })
}