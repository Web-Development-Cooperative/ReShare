import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from './baseQueryWithAuth';
import { apiTags } from './tags';

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithAuth,
	endpoints: () => ({}),
	tagTypes: Object.values(apiTags),
});
