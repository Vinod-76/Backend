import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { hash } from "../utils/encrypt";
import { setUser } from "../services/auth";
import { mailSent } from "../mail/mail";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();
export class UserController {
  constructor() {
    eventEmitter.on("scream", this.handleUsersWelcomeMailEvent);
  }

  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { firstName, lastName, email, password, isactive } = req.body;
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = await hash.make({ password: password });
      user.isactive = isactive;
      const response = await AppDataSource.manager.save(user);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async handleUsersWelcomeMailEvent(email: any) {
    try {
      await mailSent.sent(email);
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  }

  async fetchUser(req, res): Promise<any> {
    try {
      const { email, password } = req.body;
      const loginedUser = await AppDataSource.manager.findOne(User, {
        where: {
          email: email,
        },
      });
      // const token = await hash.make(loginedUser.email);
      const ischeck = await hash.compare({
        value: password,
        hash: loginedUser.password,
      });
      if (!ischeck) return res.status(403).json({ message: "login failed!" });
      const token = setUser({ email, id: loginedUser?.id });

      eventEmitter.emit("scream", email);
      res
        .status(200)
        .json({ message: "User login the successfully", token: token });
    } catch (error) {
      console.log("error in fetchUser", error);
    }
  }
}

export default UserController;
