module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Buku", "author", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Buku", "author");
    }
}