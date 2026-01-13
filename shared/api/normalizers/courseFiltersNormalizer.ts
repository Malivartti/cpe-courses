import { CoursesFilter } from '@/shared/types/course_filters';
import { CoursesFilterAPI } from '@/shared/types/course_filters.api';

export const toAPIFilter = (filter: CoursesFilter): CoursesFilterAPI => {
  return {
    is_published: filter.isPublished,
    status: filter.status,
    search: filter.search,

    formats: filter.formats,
    education_types: filter.educationTypes,
    tags: filter.tags,
    category_ids: filter.categoryIds,

    price_min: filter.priceMin,
    price_max: filter.priceMax,
    duration_min: filter.durationMin,
    duration_max: filter.durationMax,

    has_discount: filter.hasDiscount,
    is_upcoming: filter.isUpcoming,

    sort_field: filter.sortField,
    sort_order: filter.sortOrder,

    skip: filter.skip,
    limit: filter.limit,
  };
};

export const fromAPIFilter = (apiFilter: CoursesFilterAPI): CoursesFilter => {
  return {
    isPublished: apiFilter.is_published,
    status: apiFilter.status,
    search: apiFilter.search,

    formats: apiFilter.formats,
    educationTypes: apiFilter.education_types,
    tags: apiFilter.tags,
    categoryIds: apiFilter.category_ids,

    priceMin: apiFilter.price_min,
    priceMax: apiFilter.price_max,
    durationMin: apiFilter.duration_min,
    durationMax: apiFilter.duration_max,

    hasDiscount: apiFilter.has_discount,
    isUpcoming: apiFilter.is_upcoming,

    sortField: apiFilter.sort_field,
    sortOrder: apiFilter.sort_order,

    skip: apiFilter.skip,
    limit: apiFilter.limit,
  };
};
