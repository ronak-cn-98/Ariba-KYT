import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ...existing middleware/pipe/config...

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  // Log all routes so we can debug 404s
  const server = app.getHttpServer();
  const router = server._events?.request?._router;
  if (router && router.stack) {
    console.log("Registered routes:");
    router.stack
      .filter((r) => r.route)
      .forEach((r) =>
        console.log(
          `${Object.keys(r.route.methods).join(",").toUpperCase()} ${r.route.path}`,
        ),
      );
  }

  await app.listen(port, "0.0.0.0");
  console.log(`App listening on http://0.0.0.0:${port}`);
}

bootstrap();
