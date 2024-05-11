import { execSync } from 'child_process';
import { replaceInFile } from 'replace-in-file';

const args: string[] = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a seed name.');
  process.exit(1);
}

const seedName: string = args[0];

try {
  console.log("\u001b[44;37m Creating TypeORM seed... \u001b[0m");
  execSync(`ts-node node_modules/nestjs-typeorm-seeding/cli.js create -f ${seedName} -d src/config/database.ts`, { stdio: 'inherit' });
  replaceInFile({
    files: `src/database/seeds/*-${seedName.toLowerCase()}.seed.ts`,
    from: /@paranode\//g,
    to: 'nestjs-',
  }).then();
  console.log("\u001b[42;37m TypeORM seed created. \u001b[0m");
} catch (error) {
  console.error('Error occurred while creating seed:', error);
  process.exit(1);
}