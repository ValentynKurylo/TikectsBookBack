import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {UserDTO} from "../users/models/userDTO";
import * as bcrypt from "bcryptjs"
import {AuthDTO} from "../users/models/authDTO";
import {UserModel} from "../users/models/users.model";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {
    }

    async registration(body: UserDTO){
       const isUserWithSuchEmail = await this.userService.getUserByEmail(body.email)
        if(isUserWithSuchEmail){
            throw new BadRequestException('User with such email already exist');
        }
        const password = await bcrypt.hash(body.password, 4)
        const user = await this.userService.postUser({...body, password: password})
        return user
    }

      async login(body: AuthDTO){
          const user = await this.userService.getUserByEmail(body.email)
          if(!user){
              throw new BadRequestException('Wrong email or password');
          }
          const isPassword = await bcrypt.compare(body.password, user.password)
          if(!isPassword){
              throw new BadRequestException('Wrong email or password');
          }
          return await this.generateToken(user)

      }

      private async generateToken(user: UserModel){
           const payload = {
               'id': user.id,
               'fullName': user.fullName,
               'role': user.role
           }
           return {
               'token': this.jwtService.sign(payload),
               'user': payload
           }
      }


}
