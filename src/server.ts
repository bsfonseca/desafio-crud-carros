import express from "express";
import cors from "cors";
import { CarroController } from "./controllers/carro.controller";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "server is running" }));

const controller = new CarroController();

app.post("/carro", controller.create);
app.get("/carro", controller.list);
app.get("/carro/:id", controller.getByUid);
app.delete("/carro/:id", controller.remove);
app.put("/carro/:id", controller.update);

app.listen(8080, () => console.log("Server is running"));
