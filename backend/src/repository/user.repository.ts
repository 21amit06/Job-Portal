import { db } from "../utility/database";

export class UserRepository {

    async findByEmail(email: string) {

        return db.oneOrNone(
            `
            SELECT
                id,
                first_name,
                last_name,
                email,
                password,
                phone,
                user_type,
                created_at
            FROM job_portal.users
            WHERE email = $1
            `,
            [email]
        );
    }



async getMyProfile(userId: number) {

    return db.oneOrNone(
        `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            user_type,
            created_at
        FROM job_portal.users
        WHERE id = $1
        `,
        [userId]
    );

}




    async register(user: any) {

        return db.one(
            `
            INSERT INTO job_portal.users
            (
                first_name,
                last_name,
                email,
                password,
                phone,
                user_type
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING
                id,
                first_name,
                last_name,
                email,
                phone,
                user_type,
                created_at
            `,
            [
                user.first_name,
                user.last_name,
                user.email,
                user.password,
                user.phone,
                user.user_type
            ]
        );
    }
}

export const userRepository = new UserRepository();