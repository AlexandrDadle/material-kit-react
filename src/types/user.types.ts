/**
 * Base type of a user.
 */
export interface BaseUser {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone: string;
    active: boolean;
    role: string;
}

/**
 * Type of a user with the role of a Super Admin.
 */
export interface SuperAdmin extends BaseUser {}