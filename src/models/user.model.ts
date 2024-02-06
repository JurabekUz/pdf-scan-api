import {FileInterface} from "./file.model";

interface UserInterface {
    username: string;
    password: string;
    role: UserRoles;
    name: string;
    file: FileInterface;
    is_delete: boolean;
    created_at: Date;
    updated_at: Date;
}

enum UserRoles {
    ADMIN,
    DIRECTOR,
    USER,
}

export {UserInterface, UserRoles};
