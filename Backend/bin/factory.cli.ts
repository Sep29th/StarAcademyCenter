import * as fs from 'fs-extra';

let args: string[];
args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a factory name.');
  process.exit(1);
}

const factoryName: string = args[0];

const now: number = Date.now();
const fileName: string = `src/database/factories/${now}-${factoryName}.factory.ts`;
const data: string =
  `import { faker } from '@faker-js/faker';
import { define } from 'nestjs-typeorm-seeding';
import { ${factoryName} } from '../../models/entities/${factoryName}';

define(${factoryName}, (): ${factoryName} => {
  let ${factoryName.toLowerCase()}: ${factoryName};
  ${factoryName.toLowerCase()} = new ${factoryName}();
  
  // logic goes here
  
  return ${factoryName.toLowerCase()};
});    
`;

try {
  console.log("\u001b[44;37m Creating TypeORM factory... \u001b[0m");
  console.log(`Creating factory for seed name ${factoryName} ... `);
  fs.writeFileSync(fileName, data);
  console.log("\u001b[42;37m TypeORM factory created. \u001b[0m");
} catch (error) {
  console.error('Error occurred while creating factory:', error);
  process.exit(1);
}