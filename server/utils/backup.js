const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

const backupDatabase = () => {
  const dbPath = path.resolve(__dirname, '../database.sqlite');
  const backupDir = path.resolve(__dirname, '../backups');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `database-${timestamp}.sqlite`);

  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  try {
    // Copy the database file
    fs.copyFileSync(dbPath, backupPath);
    logger.info(`Database backup created: ${backupPath}`);

    // Clean up old backups (keep last 5)
    const backups = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('database-'))
      .sort()
      .reverse();

    if (backups.length > 5) {
      backups.slice(5).forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        logger.info(`Deleted old backup: ${file}`);
      });
    }
  } catch (error) {
    logger.error('Database backup failed:', error);
    throw error;
  }
};

module.exports = backupDatabase; 