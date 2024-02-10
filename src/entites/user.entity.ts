export class UserEntity {
  constructor(
    public email: string,
    public displayName: string,
    public phoneNumber: string,
    public password: string,
    public uid?: string,
    public emailVerified: boolean = false,
    public photoURL?: string,
    public disabled: boolean = false,
  ) {}
}
export class UserLoginEntity {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class uEntity{

}
