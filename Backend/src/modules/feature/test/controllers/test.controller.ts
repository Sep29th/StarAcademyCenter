import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
// import { ROLE } from 'src/models/enum/Role.enum';
import { ForRole } from 'src/common/decorators/for-role.decorator';
// import { User } from 'src/models/entities/User';
import { TestDto } from '../dto/test.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheFifoInterceptor } from 'nestjs-cache-redis';
import { ThrottlerGuard } from '@nestjs/throttler';
import { InjectS3, S3Service } from 'nestjs-storage-awss3';
import { StorageService } from 'src/modules/shared/storage/interfaces/storage.interface';
import { ApiDocs } from 'src/common/decorators/api-docs.decorator';
import { FastifyRequest } from 'fastify';
import { Student } from 'src/models/entities/Student.entity';
import { StudySession } from 'src/models/entities/StudySession.entity';
import { ClassToStudent } from 'src/models/entities/ClassToStudent.entity';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(
    // @InjectRepository(Student)
    // private studentRepository: Repository<Student>,
    // @InjectRepository(StudySession)
    // private studySessionRepository: Repository<StudySession>,
    @InjectRepository(ClassToStudent)
    private classToStudentRepository: Repository<ClassToStudent>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectS3()
    private readonly s3Service: S3Service,
    @Inject('STORAGE_SERVICE')
    private readonly storageService: StorageService,
  ) { }

  // @Get('user')
  // // @ForRole(ROLE.ADMIN)
  // @UseInterceptors(CacheFifoInterceptor)
  // @UseGuards(ThrottlerGuard, AccessTokenGuard, RoleGuard)
  // async getTestUser() {
  //   return instanceToPlain(await this.studentRepository.findOneBy({ id: 1 }));
  // }

  @Get('token')
  @ApiDocs()
  async getToken() {
    return await this.jwtService.signAsync(
      { id: 2, name: 'Trang ng', roleId: 2 },
      {
        algorithm: 'HS512',
        expiresIn: '20m',
        secret: this.configService.get('ACCESS_TOKEN'),
      },
    );
  }

  @Get('verify')
  async verify() {
    return await this.jwtService.verifyAsync(
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlRyYW5nIG5nIiwicm9sZUlkIjoyLCJpYXQiOjE3MTA0MzY2NzgsImV4cCI6MTcxMDQzNzg3OH0.W8xSzXRCv00wG-dGTwC9gekGlNJWQaMdW-Tl5B-7-6WBEYVKYCkJc1x2LhE1SViHNLtWnBY_MCwu2xFqQ9_Fhw',
      { algorithms: ['HS512'], secret: this.configService.get('ACCESS_TOKEN') },
    );
  }

  @Get('exceptions')
  testException() {
    throw new InternalServerErrorException();
  }

  @Post('pipe')
  @ApiDocs()
  testPipe(@Body() testDto: TestDto) {
    return testDto;
  }

  @Get('file/*')
  async testS3(@Req() req: FastifyRequest) {
    return await this.storageService.getFile(req.params['*']);
  }

  // @Get('/relation')
  // async test1() {
  //   return (await this.studentRepository.find({ where: { id: 1 } }))[0]
  // }

  @Get('/relation2')
  async test2() {
    return instanceToPlain(await this.classToStudentRepository.findOneBy({ id: 1 }))
  }

  // @Get('/study-session')
  // async test3() {
  //   return await this.studySessionRepository.findOneBy({ id: 1 })
  // }
}
