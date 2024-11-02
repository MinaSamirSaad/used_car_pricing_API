import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UsersService } from "src/users/users.service";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string) {
        // See if email is in use
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Email already in use");
        }
        // Hash the user password
        // Generate a salt
        const salt = randomBytes(8).toString("hex");
        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // Join the hashed result and the salt together
        const result = salt + "." + hash.toString("hex");
        // Create a new user
        const user = await this.usersService.create(email, result);
        // Return the user
        return user
    }
    async signIn(email: string, password: string) {
        // Find the user with the given email
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new BadRequestException("user not found");
        }
        // Split the salt and the hashed password
        const [salt, storedHash] = user.password.split(".");
        // Hash the provided password
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // Check if the provided password is correct
        if (storedHash !== hash.toString("hex")) {
            throw new BadRequestException("Bad password");
        }
        // Return the user
        return user;
    }
}