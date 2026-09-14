// Estas dependências serão usadas quando os TODOs forem completados em aula.
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não informado",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Formato de token inválido",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Usuário não encontrado",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}

export function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Acesso negado. Apenas administradores.",
    });
  }

  next();
}