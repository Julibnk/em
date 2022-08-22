import { Template } from '../domain/template.entity';
import { UniqueEntityId } from '../../../common/domain/entity-id';
import { Prisma } from '@prisma/client';

type PrismaTemplate = Prisma.TemplateCreateInput;

export const toPersistance = (
  template: Template
): Prisma.TemplateCreateInput => {
  const primsaTemplate: PrismaTemplate = {
    MetaAccount: {},
    id: template.id.getValue(),
    name: template.name,
    status: 'ACTIVE',
    createUsername: 'string',
    updateUsername: 'sasa',
  };

  return primsaTemplate;
};

export const toDomain = (prismaTemplate: PrismaTemplate): Template => {
  const { id, name } = prismaTemplate;
  const shortDescription = prismaTemplate.shortDescription ?? undefined;

  return Template.create({ name, shortDescription }, new UniqueEntityId(id));
};
