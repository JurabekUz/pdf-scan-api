import {CategoryInterface} from "./category.model";
import {FileInterface} from "./file.model";
import {UserInterface} from "./user.model";
import {ScopeInterface} from "./scope.model";

export interface DocumentInterface {
    type: CategoryInterface;
    scope: ScopeInterface;
    number: string;
    customerName: string;
    value: number;
    date: Date;
    file: FileInterface;
    by: UserInterface;
    status: {
        type: string;
        enum: ["pending", "confirmed", "rejected"];
        default: "pending";
    };
    is_delete: boolean;
    created_at: Date;
    updated_at: Date;
}



