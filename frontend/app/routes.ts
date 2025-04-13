import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in", "routes/login.tsx"),
  route("sign-up", "routes/register.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
