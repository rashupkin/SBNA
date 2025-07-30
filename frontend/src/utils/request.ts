import axios, { AxiosError } from "axios";
import { TRequestMethods } from "../types/TRequestMethods";
import { useAccessTokenStore } from "@/states/accessToken";
import { redirect } from "next/navigation";
import { pages } from "@/constants/pages";

interface IRequest {
  url: string;
  method?: TRequestMethods;
  data?: object;
}

export const request = async ({ url, method = "GET", data }: IRequest) => {
  const { setToken, token } = useAccessTokenStore.getState();

  const urlAPI = process.env.NEXT_PUBLIC_BACKEND_HOST_API;

  try {
    return await axios({
      method,
      url: urlAPI + url,
      data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === axios.HttpStatusCode.Unauthorized) {
      try {
        const refreshResponse = await axios.post(
          urlAPI + `/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.access_token;
        setToken(newAccessToken);

        const retryResponse = await axios({
          method,
          url: urlAPI + url,
          data,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return retryResponse;
      } catch (refreshError) {
        const refreshErr = refreshError as AxiosError;

        if (refreshErr.response?.status === axios.HttpStatusCode.Unauthorized) {
          redirect(pages.signIn);
        }

        throw refreshError;
      }
    }

    throw err;
  }
};
