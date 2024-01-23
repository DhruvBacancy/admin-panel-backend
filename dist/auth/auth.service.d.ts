import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    registerUser({ firstName, lastName, email, password, role, }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
    }): Promise<string>;
    loginUser({ email, password, }: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        role: string;
        id: string;
    }>;
}
