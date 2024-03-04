export interface PublicAddress {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }

  export interface Register{
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
  }

  export interface Login{
    password: string;
    email: string;
  }