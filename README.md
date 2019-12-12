Inintial setup could be used as boilerplate.(DOCS_QUICK_SETUP: https://docs.nestjs.com/graphql/quick-start)

to run:

yarn start:dev
Commands used within cli:

1. nest new myapp
2. $ npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
3. Code first: $ npm i type-graphql
if any conflict in ts config: delete incremental:true
4. add autoimport for schema
5. without test: nest generate module user --no-spec
nest generate resolver user --no-spec
 
 if any conflict when generating file schema.gql  : install nest-type-graphql


ro ignore error:skipLibCheck:true in ts config
