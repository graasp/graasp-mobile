// info: copied logic from query-client since we cannot update the dependencies
import { useQuery } from 'react-query';

import axios from 'axios';

import { API_HOST } from '../config/env';
import useDebounce from './useDebounce';

export const DEFAULT_ELEMENTS_PER_PAGE = 24;

export type MeiliSearchProps = {
  limit?: number;
  offset?: number;
  sort?: string[];
  attributesToCrop?: string[];
  cropLength?: number;
  highlightPreTag?: string;
  highlightPostTag?: string;
  page?: number;
  elementsPerPage?: number;
  query?: string;
  tags?: any;
  isPublishedRoot?: boolean;
  langs?: string[];
};

export const buildFacetKey = (
  args: {
    facetName?: string;
  } & MeiliSearchProps,
) => ['facets', args.facetName, args];

export const buildGetSearchFacets = (facetName: string) => {
  const params = new URLSearchParams();
  params.append('facetName', facetName);

  return `items/collections/facets?${params.toString()}`;
};

export const SEARCH_PUBLISHED_ITEMS_ROUTE = `items/collections/search`;

export const searchPublishedItems = async (query: MeiliSearchProps) => {
  return axios
    .post(`${API_HOST}/${SEARCH_PUBLISHED_ITEMS_ROUTE}`, query)
    .then(({ data }: any) => data);
};

export const getSearchFacets = async (
  query: MeiliSearchProps & { facetName: string },
) => {
  return axios
    .post(`${API_HOST}/${buildGetSearchFacets(query.facetName)}`, query)
    .then(({ data }: any) => data);
};

export const useSearchPublishedItems = ({ enabled, ...args }: any) => {
  const debouncedQuery = useDebounce(args.query, 500);
  return useQuery({
    queryKey: [
      'items',
      'search',
      { isPublishedRoot: false, query: debouncedQuery, ...args },
    ],
    queryFn: () => {
      const { page, limit, elementsPerPage = DEFAULT_ELEMENTS_PER_PAGE } = args;
      return searchPublishedItems({
        isPublishedRoot: true,
        ...args,
        elementsPerPage,
        limit: page ? elementsPerPage : limit,
        query: debouncedQuery,
      });
    },
    // we could add data in success, but not sure the data will be consistent with GET /item
    enabled,
  });
};

export const useSearchFacets = (args: any) => {
  const debouncedQuery = useDebounce(args.query, 500);
  return useQuery({
    queryKey: buildFacetKey({
      ...args,
      query: debouncedQuery,
    }),
    queryFn: () => getSearchFacets(args),
    enabled: Boolean(args.facetName),
  });
};
