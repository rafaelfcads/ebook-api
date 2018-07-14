import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from './users/users.module';
import { HealthCheckModule } from './health-check/health.check.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule,
    HealthCheckModule,
    MongooseModule.forRoot('mongodb://localhost:27017/healthcare'),
  ],
})
export class AppModule implements NestModule {

  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {

    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(HelmetMiddleware).forRoutes('*')
      .apply(CompressionMiddleware).forRoutes('*')
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }

}