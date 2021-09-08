import { HttpException, Injectable } from "@nestjs/common";
import { EntityRepository, Repository, UpdateResult, getConnection } from "typeorm";
import * as camelcaseKeys from 'camelcase-keys';
import { User } from "./entities/user.entity";

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User>{

    constructor() {
        super();
    }

    async createOrUpdateUser(userData) {
        const user = this.create();
        Object.assign(user, userData);
        return await this.save(user);
    }

    async createUser(userData) {
        const user = this.create();
        Object.assign(user, userData);
        return await this.save(user);
    }

    async deleteUser(id) {
        if (!id) {
            return null;
        }
        return this.delete(id);
    }

    async findAllUser() {
        return await this.find();
    }

    async getUserByEmail(email: string) {
        const user = await this.find({
          where: { email },
        });
        return (user && user.length ? user[0] : null);
    }

}