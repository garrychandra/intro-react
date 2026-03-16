module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Buku", "author");
        await queryInterface.createTable("Orang", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
        await queryInterface.addColumn("Buku", "authorId", {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: "Orang",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Buku", "authorId");
        await queryInterface.dropTable("Orang");
        await queryInterface.addColumn("Buku", "author", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    }
}