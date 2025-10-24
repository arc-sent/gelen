import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    use(req: any, res: any, next: () => void) {
        const token = req.cookies?.access_token;
        try {
            req.user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            next();
        } catch (e) {
            console.error(e);

            throw new UnauthorizedException('Invalid token');
        }
    }
}