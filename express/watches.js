import express from "express";
import os from "os";
const app = express();
console.log("hostname", os.hostname());
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log("listening to port : ", port);
});

let watchData = [];

let nextId = 1;

// add the watch
app.post("/watch", (req, res) => {
  console.log("Received body:", req.body);
  const { name, type } = req.body;
  if (!name || !type) {
    return res
      .status(400)
      .json({ error: "Missing 'name' or 'type' in request body" });
  }
  const newWatch = { id: nextId++, name, type };
  watchData.push(newWatch);
  res.status(200).send(newWatch);
});

app.get("/watch", (req, res) => {
  res.status(200).send(watchData);
});

app.get("/", (req, res) => {
  res.send("welcome to casio india shop");
});

// search by id
app.get("/watch/:id", (req, res) => {
  const watch = watchData.find((w) => w.id === parseInt(req.params.id));

  if (!watch) {
    return res.status(404).send("watch not found");
    // bcz of return statement , we dont have to use else
  }
  res.status(200).send(watch);
});

//update watch
app.put("/watch/:id", (req, res) => {
  const watch = watchData.find((w) => w.id === parseInt(req.params.id));
  if (!watch) {
    return res.status(404).send("watch not found");
  }
  const { name, type } = req.body;
  watch.name = name;
  watch.type = type;
  res.status(200).send(watch);
});

// delete
app.delete("/watch/:id", (req, res) => {
  const index = watchData.findIndex((t) => t.id === parseInt(req.params.id)); // Fixed typo
  if (index === -1) {
    return res.status(404).send("watch not found");
  }
  watchData.splice(index, 1);
  return res.status(204).send("deleted");
});
