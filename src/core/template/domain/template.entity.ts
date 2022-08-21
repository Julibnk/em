export class TemplateEntity {
  constructor(
    readonly accountId: string,
    public name: string,
    public description?: string,
    public preview?: string,
    public variable1?: string,
    public variable2?: string,
    public variable3?: string
  ) {}

  //   set name
}
