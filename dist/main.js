"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const global_exception_filter_1 = require("./filter/global-exception.filter");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionsFilter());
    app.setGlobalPrefix('admin');
    app.enableCors({
        allowedHeaders: ['content-type', 'Authorization'],
        origin: '*',
        credentials: true,
    });
    await app.listen(process.env.APP_PORT);
    console.log(`App running on http://localhost:${process.env.APP_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map