import mysql from "mysql2/promise";

let connection = null;
const memoryStore = {
  users: [],
  cars: [],
  buys: [],
};

const createMemoryConnection = () => ({
  query: async (sql, params = []) => {
    const normalized = sql.trim().toLowerCase();

    if (normalized.startsWith("select") && normalized.includes("from users")) {
      const emailMatch = normalized.match(/where\s+email\s*=\s*\?/i);
      const idMatch = normalized.match(/where\s+id\s*=\s*\?/i);

      if (emailMatch) {
        return [memoryStore.users.filter((user) => user.email === params[0])];
      }

      if (idMatch) {
        return [memoryStore.users.filter((user) => user.id === params[0])];
      }

      return [memoryStore.users.map((user) => ({ ...user }))];
    }

    if (normalized.startsWith("insert into users")) {
      const [username, email, password, role] = params;
      const newUser = {
        id: memoryStore.users.length + 1,
        username,
        email,
        password,
        role,
      };
      memoryStore.users.push(newUser);
      return [{ insertId: newUser.id, affectedRows: 1 }];
    }

    if (normalized.startsWith("update users")) {
      if (normalized.includes("set password")) {
        const [password, id] = params;
        const user = memoryStore.users.find((entry) => entry.id === id);
        if (user) {
          user.password = password;
        }
        return [{ affectedRows: user ? 1 : 0 }];
      }

      if (normalized.includes("set role")) {
        const [id] = params;
        const user = memoryStore.users.find((entry) => entry.id === id);
        if (user) {
          user.role = "admin";
        }
        return [{ affectedRows: user ? 1 : 0 }];
      }
    }

    if (normalized.startsWith("insert into cars")) {
      const [userId, name, model, price, description, image] = params;
      const newCar = {
        id: memoryStore.cars.length + 1,
        user_id: userId,
        name,
        model,
        price,
        description,
        image,
      };
      memoryStore.cars.push(newCar);
      return [{ insertId: newCar.id, affectedRows: 1 }];
    }

    if (normalized.startsWith("select") && normalized.includes("from cars")) {
      return [memoryStore.cars.map((car) => ({ ...car }))];
    }

    if (normalized.startsWith("insert into buys")) {
      const [userId, carId] = params;
      memoryStore.buys.push({ user_id: userId, car_id: carId });
      return [{ affectedRows: 1 }];
    }

    return [[]];
  },
});

export const connectTODatabase = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Connected to Railway MySQL");
  } catch (error) {
    connection = createMemoryConnection();
    console.warn(
      "⚠️ Database unavailable, using in-memory fallback:",
      error.message,
    );
  }

  return connection;
};
