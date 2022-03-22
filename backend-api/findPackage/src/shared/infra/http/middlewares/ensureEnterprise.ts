import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureEnterprise(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.isEnterprise) {
    throw new AppError("Users is not enterprise!");
  }
  return next();
}