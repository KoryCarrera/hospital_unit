import { UserRepository } from "../repositories/userRepository.js";

export class UserService {

    constructor(
        private user: UserRepository
    ) { }

    public async userAnalytic() {

        try {
            const consult = this.user.usersInfo();

            return consult;

        } catch (err: any) {
            console.error(err.message)
        }
    }
}