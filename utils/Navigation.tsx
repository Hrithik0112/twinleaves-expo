import { router, Route } from "expo-router";

export const resetAndNavigateTo = (routeName: Route) => {
  try {
    if (router.canGoBack()) {
      router.back();
    }
    router.replace(routeName);
  } catch (error) {
    // Fallback if navigation fails
    router.replace(routeName);
  }
};

export const resetAndNavigateToWithParams = (routeName: Route, params: any) => {
  if (router.canGoBack()) {
    router.dismissAll();
  }
  router.replace({ pathname: routeName, params });
};