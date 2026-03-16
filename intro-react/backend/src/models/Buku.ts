import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import { Orang } from "./Orang";

@Table({
  tableName: "Buku",
  timestamps: true,
})
export class Buku extends Model {
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
  judul!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deskripsi!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tahun!: string;

  @Column({
    type: DataType.ENUM("novel", "komik", "majalah"),
    allowNull: false,
  })
  kategori!: "novel" | "komik" | "majalah";

  @Column({
    type: DataType.ENUM("available", "borrowed"),
    allowNull: true,
  })
  status!: "available" | "borrowed";

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  peminjam!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  
  @Column({
    type: DataType.UUIDV4,
    allowNull: true,
  })
  authorId!: string;

  @BelongsTo(() => Orang, "authorId")
  author!: Orang;
}
