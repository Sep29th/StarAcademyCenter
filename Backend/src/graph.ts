import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs-extra';
import { DiagramModule } from 'nestjs-module-diagram';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: false,
  });
  const tree = DiagramModule.explore(app);
  const root = DiagramModule.graph(tree);
  const edges = DiagramModule.findGraphEdges(root);
  const mermaidEdges = edges.map(
    ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  );
  fs.writeFileSync(
    'graph.md',
    '```mermaid\ngraph LR\n' + mermaidEdges.join('\n') + '\n```',
  );
  await app.close();
  console.log(
    `\x1b[44m GRAPH \x1b[0m\x1b[34m Graph of module for review is already generated at graph.md !\x1b[0m`,
  );
}

bootstrap().then();
