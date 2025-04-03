export interface StrapiUserResponse {
    id: number
    username: string
    email: string
    password: string
    resetPasswordToken: string
    confirmationToken: string
    confirmed: boolean
    blocked: boolean
    documentId: string
    createdAt: Date
    updatedAt: Date
    role: Role
  }
  export interface Role {
    id: number
    name: RoleName
    description: string
    type: RoleType
    createdAt: Date
    updatedAt: Date
  }
  
  export enum RoleType {
    Public = 'public',
    Authenticated = 'authenticated',
  }
  export enum RoleName {
    Public = 'Public',
    Authenticated = 'Authenticated',
  }
  
  export interface StrapiLoginResponse {
    readonly jwt: string
    readonly user: StrapiUserResponse
  }
  