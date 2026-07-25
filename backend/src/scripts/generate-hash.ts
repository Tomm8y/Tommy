import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash -- <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// Docker Compose's `env_file` treats a lone "$" as the start of a shell-style
// variable reference, which silently corrupts bcrypt hashes (they contain "$").
// Escaping each "$" as "$$" makes the value safe to place in a Compose env file.
const dockerEscaped = hash.replace(/\$/g, "$$$$");

console.log("\nRaw bcrypt hash — use this for LOCAL development (npm run dev, no Docker):");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);

console.log(
  "\nDocker Compose env_file-safe version — use this one ONLY when backend/.env is\n" +
    "consumed via docker-compose's `env_file:` (Compose treats a lone \"$\" as a shell\n" +
    "variable and corrupts the hash; dotenv/Node does NOT do this substitution, so\n" +
    "using the escaped version outside Docker will break login):"
);
console.log(`ADMIN_PASSWORD_HASH=${dockerEscaped}`);
