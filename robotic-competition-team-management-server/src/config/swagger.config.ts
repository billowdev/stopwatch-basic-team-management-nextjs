import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('nestjs example project')
.setDescription('The example project nestjs with sequelize swagger')
.setVersion('1.0')
.addTag('nestjs example project')
.addBearerAuth()
.setContact('GitHub-Repository', 'https://github.com/billowdev/nestjs-example-restful-api', '')
.build();