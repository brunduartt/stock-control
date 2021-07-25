export interface IProduct {
  id?: number;
  name?: string;
  amount?: number;
  unitValue?: number;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public amount?: number,
    public unitValue?: number,
  ) {
   
  }
}
