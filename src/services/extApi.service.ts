import ApiError from '../errors/Api.error.ts';

import { BookComicChoices } from '../types/extApi.type.ts';

const bookApiUrl = process.env.EXT_BOOK_API_URL;
const prodMail = process.env.PROD_MAIL;

export default {
  /**
   * Get books or comics list from external api
   * @param {string} input - Title to look for
   * @throws {ApiError} Throw custom error with 'External request failed' and status code
   * @returns {Promise<BookComicChoices>} An array containing essentials data for each item found
   */
  async getBookComic(input: string): Promise<BookComicChoices> {
    const urlEncoded = encodeURIComponent(input).replace(/%20/g, '+');
    const response = await fetch(`${bookApiUrl}title=${urlEncoded}&lang=fr`, {
      method: 'GET',
      headers: {
        'User-Agent': `Hobbies (${prodMail})`,
      },
    });
    if (!response.ok) {
      throw new ApiError('External request failed', response.status);
    }

    const { docs } = await response.json();
    console.log(docs);
    //TODO docs type
    return docs.map((item) => ({
      key: item.key,
      title: item.title,
      authors: item.author_name,
    }));
  },
};
