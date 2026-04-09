// ...existing imports...
import { NestFactory } from "@nestjs/core";
import { ServerModule } from "./server.module";

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  // ...existing setup (global pipes, prefixes, etc.)...
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
