import { Course } from '@/shared/types/course';

export type CourseValidationErrors = {
  title?: string;
  description?: string;
  duration?: string;
  price?: string;
  discountedPrice?: string;
  format?: string;
  educationType?: string;
  certificateType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

export class CourseValidator {
  static isValidDateFormat(dateString: string): boolean {
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = dateString.match(dateRegex);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > 2100) return false;

    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  }

  static parseDisplayDate(displayDate: string): Date | null {
    const parts = displayDate.split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  static convertDisplayDateToISO(displayDate: string): string {
    const [day, month, year] = displayDate.split('.');
    return `${year}-${month}-${day}`;
  }

  static validateBasicInfo(data: Partial<Course>): CourseValidationErrors {
    const errors: CourseValidationErrors = {};

    if (!data.title?.trim()) {
      errors.title = 'Название обязательно';
    } else if (data.title.trim().length < 3) {
      errors.title = 'Название должно содержать минимум 3 символа';
    } else if (data.title.trim().length > 255) {
      errors.title = 'Название не должно превышать 255 символов';
    }

    if (data.duration === null || data.duration === undefined) {
      errors.duration = 'Длительность обязательна';
    } else if (data.duration <= 0) {
      errors.duration = 'Длительность должна быть больше 0';
    }

    if (data.price === null || data.price === undefined) {
      errors.price = 'Цена обязательна';
    } else if (data.price < 0) {
      errors.price = 'Цена не может быть отрицательной';
    }

    if (data.discountedPrice !== null && data.discountedPrice !== undefined) {
      if (data.discountedPrice < 0) {
        errors.discountedPrice = 'Цена со скидкой не может быть отрицательной';
      } else if (
        data.price !== null &&
        data.price !== undefined &&
        data.discountedPrice >= data.price
      ) {
        errors.discountedPrice = 'Цена со скидкой должна быть меньше обычной цены';
      }
    }

    return errors;
  }

  static validateDetails(data: Partial<Course>): CourseValidationErrors {
    const errors: CourseValidationErrors = {};

    if (!data.format) {
      errors.format = 'Выберите формат курса';
    }

    if (!data.educationType) {
      errors.educationType = 'Выберите тип обучения';
    }

    if (!data.certificateType) {
      errors.certificateType = 'Выберите тип сертификата';
    }

    if (!data.status) {
      errors.status = 'Выберите статус курса';
    }

    if (data.startDate) {
      if (!this.isValidDateFormat(data.startDate)) {
        errors.startDate = 'Неверный формат даты (используйте ДД.ММ.ГГГГ)';
      }
    }

    if (data.endDate) {
      if (!this.isValidDateFormat(data.endDate)) {
        errors.endDate = 'Неверный формат даты (используйте ДД.ММ.ГГГГ)';
      }
    }

    if (data.startDate && data.endDate && !errors.startDate && !errors.endDate) {
      const startDate = this.parseDisplayDate(data.startDate);
      const endDate = this.parseDisplayDate(data.endDate);
      if (startDate && endDate && startDate.getTime() >= endDate.getTime()) {
        errors.endDate = 'Дата окончания должна быть позже даты начала';
      }
    }

    return errors;
  }

  static validateStep(step: number, data: Partial<Course>): boolean {
    switch (step) {
      case 1:
        return Object.keys(this.validateBasicInfo(data)).length === 0;
      case 2:
        return Object.keys(this.validateDetails(data)).length === 0;
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return false;
    }
  }

  static validateAll(data: Partial<Course>): CourseValidationErrors {
    return {
      ...this.validateBasicInfo(data),
      ...this.validateDetails(data),
    };
  }
}
