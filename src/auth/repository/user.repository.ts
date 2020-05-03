import { Repository, EntityRepository } from "typeorm";
import { User } from '../../models/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { InternalServerErrorException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { encryptPassword, comparePassword } from '../../utils/encrypt.utils';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    public async signUp(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password } = createUserDto;
        const user = new User();
        user.username = username;
        user.password = await encryptPassword(password);
        user.email = email;
        user.img = "";
        user.created_at = new Date();
        user.updated_at = new Date();
        try {
            await user.save();
            delete user.password;
            return user;
        } catch (err) {
            if (err.code === "23505") { // duplicate email
                throw new ConflictException(`There is already a user with email ${email}`);
            } 
            throw new InternalServerErrorException(err);
        }
    }

    public async verifyUserPassword(email: string, password: string): Promise<boolean> {
        const user = await this.findOne({ email });
        if (user) {
            return await comparePassword(password, user.password);
        }
        return false;
    }
}