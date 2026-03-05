"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = process.env.PORT || 4000;
    const server = app.getHttpServer();
    const router = server._events?.request?._router;
    if (router?.stack) {
        const routes = router.stack
            .filter((layer) => layer.route)
            .map((layer) => ({
            method: Object.keys(layer.route.methods)[0]?.toUpperCase(),
            path: layer.route.path,
        }));
        console.log('ROUTES:', routes);
    }
    await app.listen(port);
    console.log(`Backend rodando na porta ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map