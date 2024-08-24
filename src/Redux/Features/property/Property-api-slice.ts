import { apiSlice } from "../api/apiSlice";


export const propertySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // register: builder.mutation({
    //   query: (data) => ({
    //     url: "/user/signup",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    getProperty: builder.query({
      query: (text) => ({
        url: `/property/filter?searchText=${text}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  // useRegisterMutation,
  useGetPropertyQuery
} = propertySlice;
