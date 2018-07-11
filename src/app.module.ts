import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CompressionMiddleware } from '@nest-middlewares/compression';

import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, GraphQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {

    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    console.log('***** GRAPHQL typeDefs *********');
    console.log(typeDefs);

    console.log('***** GRAPHQL schema *********');
    console.log(schema);

    consumer
      // .apply(HelmetMiddleware).forRoutes('*')
      // .apply(CompressionMiddleware).forRoutes('*')
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }

}