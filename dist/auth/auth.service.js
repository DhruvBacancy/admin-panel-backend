"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const user_model_1 = require("../models/user.model");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async registerUser({ firstName, lastName, email, password, role, }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await user_model_1.User.create({
                id: (0, uuid_1.v4)(),
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role,
            });
            return 'Registration Successful';
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Registration failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async loginUser({ email, password, }) {
        try {
            const user = await user_model_1.User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const expiresIn = process.env.JWT_EXPIRATION_TIME;
            const payload = { id: user.id, role: user.role };
            const token = this.jwtService.sign(payload, { expiresIn });
            return { token, role: user.role, id: user.id };
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map