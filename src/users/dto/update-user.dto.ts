import { UserUpdatableInterface } from "../interfaces";

export class UpdateUserDto implements UserUpdatableInterface {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    active?: boolean;
}