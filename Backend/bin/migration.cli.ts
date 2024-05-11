import { execSync } from 'child_process';
import { replaceInFile } from 'replace-in-file';


const args: string[] = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a migration name.');
  process.exit(1);
}

const migrationName: string = args[0];

try {
  console.log("\u001b[44;37m Creating TypeORM migration... \u001b[0m");
  execSync(`ts-node node_modules/typeorm/cli.js migration:create src/database/migrations/${migrationName}.migration`, { stdio: 'inherit' });
  replaceInFile({
    files: `src/database/migrations/*-${migrationName}.migration.ts`,
    from: /\.migration/g,
    to: '',
  }).then();
  console.log("\u001b[42;37m TypeORM migration created. \u001b[0m");
} catch (error) {
  console.error('Error occurred while creating migration:', error);
  process.exit(1);
}