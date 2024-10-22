import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prismaClient.js"; // Adjust the import based on your prisma setup
import { registerUserSchema } from "../validations/zod.js";
import { z } from "zod";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate request data against the schema
    const validatedData = registerUserSchema.parse(req.body);

    const { email, password, companyName, companyWebsite, interestedIn } =
      validatedData;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        companyName,
        companyWebsite,
        interestedIn,
        credits: 0,
      },
    });

    // Return the newly created user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const validateUser = async (email: string, pass: string) => {
  // Fetch user from the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(pass, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Return user data without the password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
