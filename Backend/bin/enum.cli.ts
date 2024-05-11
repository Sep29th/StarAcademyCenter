import * as fs from 'fs-extra';

let args: string[];
args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a enum name.');
  process.exit(1);
}

const factoryName: string = args[0];

const now: number = Date.now();
const fileName: string = `src/models/enum/${factoryName}.enum.ts`;
const data: string =
`export class ${factoryName.toUpperCase()} {
  static KEY = "value";

  private static values = new Map([
    ["key", 'value']
  ]);

  static get(key: any) {
    return this.values.get(key);
  }
}    
`;

try {
  console.log("\u001b[44;37m Creating TypeORM factory... \u001b[0m");
  console.log(`Creating enum name ${factoryName} ... `);
  fs.writeFileSync(fileName, data);
  console.log("\u001b[42;37m TypeORM enum created. \u001b[0m");
} catch (error) {
  console.error('Error occurred while creating enum:', error);
  process.exit(1);
}