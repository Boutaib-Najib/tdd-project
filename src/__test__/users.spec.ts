import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import UserRepository from "src/data/usersRepository/userRepository";
import UserSQLRepository from "src/data/usersRepository/userSQLRepository";
import UserDomainService from "src/services/users/userDomainService";
import { createUsersTable, clearUsersTable } from "src/utils/sql-scripts";

let userService: UserDomainService;
let userRepository: UserRepository;
let db: Database<sqlite3.Database, sqlite3.Statement>;

describe("Testing user resource", () => {
  beforeAll(async () => {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    await createUsersTable(db);

    userRepository = new UserSQLRepository(db);
    userService = new UserDomainService(userRepository);
  });

  afterAll(async () => {
    await clearUsersTable(db);
  });

  it("should create a new user", async () => {
    const userId = await userService.createUser("epit");

    expect(userId).toBeTruthy();
  });

  it("should delete an existing user", async () => {
    const userId = await userService.createUser("iamadeadman");
    const isDeleted = await userService.removeUser(userId);

    expect(isDeleted).toBe(true);
  });

  it("should get a user by id", async () => {
    const userId = await userService.createUser("newusername");
    const user = await userService.searchById(userId);

    expect(user.id).toBe(userId);
    expect(user.username).toBe("newusername");
  });

  it("should get a user by pseudoname", async () => {
    const userId = await userService.createUser("some-pseudo");
    const user = await userService.searchByPseudo("some-pseudo");

    expect(user.id).toBe(userId);
    expect(user.username).toBe("some-pseudo");
  });
});
