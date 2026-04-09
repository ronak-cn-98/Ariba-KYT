// ...existing imports...
import { Module } from "@nestjs/common";
import { AppController } from "../app.controller";

@Module({
  imports: [
    // ...existing imports...
  ],
  controllers: [
    // ...existing controllers...
    AppController,
  ],
  providers: [
    // ...existing providers...
  ],
})
export class ServerModule {}
