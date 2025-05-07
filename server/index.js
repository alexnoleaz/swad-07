import jsonServer from "json-server";
import auth from "json-server-auth";

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const rules = auth.rewriter({
  "/api/auth/login": "/login",
  "/api/auth/register": "/register",
  "/api/tasks": "/tasks",
  "/api/664/tasks": "/664/tasks",
  "/api/tasks/:id": "/664/tasks/:id",
});

app.db = router.db;
app.use(jsonServer.defaults());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log("\tServer is running at http://localhost:3000");
  console.log("\tPress CTRL+C to stop\n");
});
