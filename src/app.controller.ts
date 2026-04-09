import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  // ...existing code...

  @Get("/")
  getRoot() {
    return { status: "ok", message: "Ariba DevOps Portal API is running" };
  }

  // ...existing code...
}
