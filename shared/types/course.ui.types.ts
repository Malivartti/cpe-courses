export type CoursePreview = {
  id: string;
  title: string;
  description: string;

  price: number;
  discountPrice?: number;

  duration: number;

  direction: {
    name: string;
  };

  format: {
    name: string;
  };
};
