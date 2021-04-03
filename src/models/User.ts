import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from './../types/UserTypes';
import { db } from './../data-access/db-scripts'

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
    }, {
        timestamps: false
    });
}

export const User = UserFactory(db)
