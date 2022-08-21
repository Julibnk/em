interface ConstructorProps {
  // accountId: string;
  name: string;
  description?: string;
  preview?: string;
  variable1?: string;
  variable2?: string;
  variable3?: string;
}

export class TemplateEntity {
  // public accountId: string;
  public name: string;
  public description?: string;
  public preview?: string;
  public variable1?: string;
  public variable2?: string;
  public variable3?: string;

  constructor({
    // accountId,
    name,
    description,
    preview,
    variable1,
    variable2,
    variable3,
  }: ConstructorProps) {
    // this.accountId = accountId;
    this.name = name;
    this.description = description;
    this.preview = preview;
    this.variable1 = variable1;
    this.variable2 = variable2;
    this.variable3 = variable3;
  }

  //   set name
}
