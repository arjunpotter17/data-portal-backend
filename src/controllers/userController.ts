import { Request, Response } from "express";
import { registerUser, validateUser } from "../services/userService.js";
import { loginSchema } from "../validations/zod.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../prismaClient.js";

export const getUserCreate = async (req: Request, res: Response) => {
  try {
    const data = await registerUser(req, res);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const getUserLogin = async (req: Request, res: Response) => {
  try {
    // Validate request body
    loginSchema.parse(req.body);
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If the login is successful
    return res.json({
      message: "Login successful",
      user: {
        email: user.email,
        companyName: user.companyName,
        companyWebsite: user.companyWebsite,
        interestedIn: user.interestedIn,
        credits: user.credits,
      },
    });
  } catch (error) {
    // Handle validation errors or any unexpected errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', issues: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
