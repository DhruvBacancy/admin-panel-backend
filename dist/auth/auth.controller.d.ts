import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<string>;
    login(body: any): Promise<{
        token: string;
        role: string;
        id: string;
    }>;
}
