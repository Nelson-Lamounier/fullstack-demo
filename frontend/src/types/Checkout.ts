export interface FormFields {
  email: string;
  FullName: string;
  password?: string;
  Line1: string;
  Line2: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
}

export interface PaymentFields {
  cardNumber: number;
  nameOnCard: string;
  expirationDate: string;
  cvv: string;
}


