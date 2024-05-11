import { execSync } from 'child_process';
import { replaceInFile } from 'replace-in-file';

const args: string[] = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a entity name.');
  process.exit(1);
}

const entityName: string = args[0];

try {
  console.log('\u001b[44;37m Creating TypeORM entity... \u001b[0m');
  execSync(`ts-node node_modules/typeorm/cli.js entity:create src/models/entities/${entityName}.entity`, { stdio: 'inherit' });
  replaceInFile({
    files: `src/models/entities/${entityName}.entity.ts`,
    from: /\.entity/g,
    to: '',
  }).then();
  console.log('\u001b[42;37m TypeORM entity created. \u001b[0m');
} catch (error) {
  console.error('Error occurred while creating entity:', error);
  process.exit(1);
}