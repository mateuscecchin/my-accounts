interface ITransaction {
  id: string;
  description: string;
  type: string;
  category: ICategory;
  date: Date;
  amount: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ICategory {
  id: string;
  name: string;
  description: string;
}
