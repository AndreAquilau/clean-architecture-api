module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || 'dist/models/**/*.js'],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'dist/database/migrations/**/*.js',
  ],
  subcribers: [process.env.TYPEORM_SUBCRIBERS || 'dist/subcribers/**/*.js'],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    subscribersDir: process.env.TYPEORM_SUBESCRIBERS_DIR,
  },
};
