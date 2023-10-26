const { generateHash } = require("../../../services/bcrypt");

module.exports = async () => [
  {
    id: 1,
    name: "Felipe Carvalho",
    email: "felipe@test.com",
    password_hash: await generateHash("senhateste"),
    role: "customer",
  },
  {
    id: 2,
    name: "Ana Silva",
    email: "ana@test.com",
    password_hash: await generateHash("senha123"),
    role: "customer",
  },
  {
    id: 3,
    name: "João Pereira",
    email: "joao@test.com",
    password_hash: await generateHash("minhasenha"),
    role: "customer",
  },
  {
    id: 4,
    name: "Maria Souza",
    email: "maria@test.com",
    password_hash: await generateHash("123456"),
    role: "customer",
  },
  {
    id: 5,
    name: "Lucas Santos",
    email: "lucas@test.com",
    password_hash: await generateHash("teste1234"),
    role: "customer",
  },
];
