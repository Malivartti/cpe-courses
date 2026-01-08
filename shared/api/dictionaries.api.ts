import { Dictionaries } from '../types/dictionaries';
import { delay, MOCK_DELAY } from './client';
import { MOCK_DICTIONARIES } from './mocks/dictionaries.mock';

export const dictionariesApi = {
  async getAll(): Promise<Dictionaries> {
    await delay(MOCK_DELAY);
    return MOCK_DICTIONARIES;
  },
};
