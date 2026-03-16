import { HasMany } from "sequelize-typescript";
import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";
import { Buku } from "./Buku";

@Table({
  tableName: "Orang",
  timestamps: true,
})
export class Orang extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @HasMany(() => Buku, "authorId")
    bukus!: Buku[];
}