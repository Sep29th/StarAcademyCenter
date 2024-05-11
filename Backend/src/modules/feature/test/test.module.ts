import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../models/entities/Student.entity';
import { TestController } from './controllers/test.controller';
import { StorageModule } from 'src/modules/shared/storage/storage.module';
import { StudySession } from 'src/models/entities/StudySession.entity';
import { ClassToStudent } from 'src/models/entities/ClassToStudent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassToStudent]), StorageModule],
  controllers: [TestController],
})
export class TestModule { }
