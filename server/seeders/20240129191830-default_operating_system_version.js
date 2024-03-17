'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('operating_system_versions', [      
        { id: 1, version: 'Windows 11' },
        { id: 2, version: 'Windows 10' },
        { id: 3, version: 'Windows 8.1' },
        { id: 4, version: 'Windows 8' },
        { id: 5, version: 'Windows 7' },
        { id: 6, version: 'Windows XP' },
        { id: 7, version: 'Windows Server 2003' },
        { id: 8, version: 'Windows Server 2008' },
        { id: 9, version: 'Windows Server 2012' },
        { id: 10, version: 'Windows Server 2016' },
        { id: 11, version: 'Windows Server 2019' },
        { id: 12, version: 'Ubuntu' },
        { id: 13, version: 'Debian' },
        { id: 14, version: 'CentOS' },
        { id: 15, version: 'OpenSUSE' },
        { id: 16, version: 'Red Hat Enterprise Linux' },
        { id: 17, version: 'macOS Monterrey' },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('operating_system_versions', null, {})
  }
};
