export interface IHasId {
    id: number;
}

export interface IModel extends IHasId {
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface User extends IModel {
    username: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: string;
    profile_photo_url: string;
    email_verified_at?: string;
}

export interface Address extends IModel {
    address_name: string;
    address_line_1: string;
    user_id: number;
    latitude: number;
    longitude: number;
}

export interface Appointment extends IModel {
    user_id: number;
    address: string;
    date: string;
}

export interface Transaction extends IModel {
    amount: number;
    user_id: number;
    address_id: number;
    appointment_id: number;
    points: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
