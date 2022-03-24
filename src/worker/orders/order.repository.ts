import path from "node:path";
import fs from "node:fs/promises";
import { Order } from "./order.model";

const DB_PATH = path.resolve(__dirname, "..", "..", "..", "db");

async function readJsonFile<T>(id: string): Promise<T> {
  const filePath = path.join(DB_PATH, id);
  const json = await fs.readFile(filePath, {
    encoding: "utf8",
  });

  return JSON.parse(json, (key, jsonValue) => {
    if (typeof jsonValue === "string" && key.endsWith("At")) {
      const maybeDate = new Date(jsonValue);

      return Number.isNaN(maybeDate.getTime()) ? jsonValue : maybeDate;
    }

    return jsonValue;
  });
}

async function writeJsonFile<T>(id: string, content: T): Promise<void> {
  const filePath = path.join(DB_PATH, id);
  const json = JSON.stringify(content, undefined, 2);

  await fs.writeFile(filePath, json, {
    encoding: "utf8",
  });
}

export async function getOrder(id: string): Promise<Order> {
  const order = await readJsonFile<Order>(id);

  if (!order) {
    throw new Error("Order does not exist");
  }

  return order;
}

export async function saveOrder(order: Order): Promise<Order> {
  const { id } = order;

  await writeJsonFile(id, order);
  return order;
}

export async function bootstrapDB() {
  await fs.mkdir(DB_PATH, { recursive: true });
}
