import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoDBConnection, MySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';

@Module({
  controllers: [UserController],
  providers: [UserService, 
    {
        provide: Connection,
        useClass:
          process.env.DATAVSE =='mysql' ? MySQLConnection : MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService,
    }, 
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    },
    MemberService,
  ],
})

export class UserModule {}
