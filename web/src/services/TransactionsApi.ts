interface ITransaction {
  id: string;
  description: string;
  type: string;
  category: string;
  date: Date;
  amount: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}
