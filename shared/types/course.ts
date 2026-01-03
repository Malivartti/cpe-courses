export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  format: 'онлайн' | 'очно' | 'смешанный';
  educationType: 'повышение квалификации' | 'профпереподготовка';
};
