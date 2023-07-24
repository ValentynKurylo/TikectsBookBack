import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDTO} from "../users/models/userDTO";
import {AuthDTO} from "../users/models/authDTO";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('registration')
    async registration(@Body() body: UserDTO){
        const user = await this.authService.registration(body)
        return user
    }

    @Post('login')
    async login(@Body()body: AuthDTO){
        return await this.authService.login(body)
    }
}
