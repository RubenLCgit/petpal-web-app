export interface User {
  userId: number,
  userRole: string,
  userName: string,
  userEmail: string,
  userPassword: string,
  userRegisterDate: string,
  userSupplier: boolean,
  userRating: number,
  listIdProducts: number[],
  listIdServices: number[]
}


export interface UserLogin {
  userName: string,
  userPassword: string
}

export interface UserRegister {
  userName: string,
  userEmail: string,
  userPassword: string,
  userSupplier: boolean
}

export interface UserUpdate {
  userId: number,
  userName: string,
  userEmail: string,
  userPassword: string,
  userSupplier: boolean
}

