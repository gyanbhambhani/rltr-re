export interface User {
  email: string;
  password: string;
  role: 'investor' | 'flipper';
  name?: string;
}

export interface FlipMyFundData {
  users: User[];
  // Add other data types as needed
} 