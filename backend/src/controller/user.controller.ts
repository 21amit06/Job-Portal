import { Request, Response } from "express";
import { userRepository } from "../repository/user.repository";
import { AuthRequest } from "../middleware/auth.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {

    // REGISTER
    async register(req: Request, res: Response) {

        try {

            const {
                first_name,
                last_name,
                email,
                password,
                phone,
                user_type
            } = req.body;


            // Check required fields

            if (!first_name ||!email ||!password ||!user_type) {

                return res.status(400).json({
                    message: "First name, email, password and user type are required"
                });

            }


            // Check valid role

            if (
                user_type !== "JOB_SEEKER" &&
                user_type !== "RECRUITER" &&
                user_type !== "ADMIN"
            ) {

                return res.status(400).json({
                    message: "Invalid user type"
                });

            }


            // Check existing user

            const existingUser = await userRepository.findByEmail(email);


            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists with this email"
                });

            }

            // Hash password
            const hashPassword =await bcrypt.hash(password, 10);

            // Create new user object
            const newUser = {
                first_name: first_name,
                last_name: last_name || "",
                email: email,
                password: hashPassword,
                phone: phone || "",
                user_type: user_type

            };


            // Save user

            const user = await userRepository.register(newUser);

            return res.status(201).json({
                message: "User registered successfully",
                user: user

            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }
    }



   
    // LOGIN
   

    async login(req: Request, res: Response) {

        try {
            const {
                email,
                password
            } = req.body;


            // Check required fields

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });

            }


            // Find user

            const user = await userRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });

            }


            // Compare password

            const match =await bcrypt.compare(password,user.password);
            if (!match) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });

            }


            // Create JWT

            const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        user_type: user.user_type
                    },

                    process.env.my_Secretkey!,

                    {
                        expiresIn: "3h"
                    }
                );


            return res.status(200).json({
                message: "Login successful",
                token: token,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    user_type: user.user_type

                }

            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }
    }





    async getMyProfile(req: AuthRequest, res: Response) {

       try {
            const userId = req.user.id;
           const user =await userRepository.getMyProfile(userId);
           if (!user) {
            return res.status(404).json({
                message: "User not found"
            });

        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user: user

        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });

    }

}
}