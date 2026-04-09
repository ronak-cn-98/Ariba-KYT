import { createServer } from "./index";

const port = Number(process.env.PORT) || 3000;

const app = createServer();

app.listen(port, () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
