const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/recommend",
  meta: {
    icon: "ep:home-filled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/recommend",
      name: "Recommend",
      component: () => import("@/views/recommend/index.vue"),
      meta: {
        title: "推荐",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    },
    {
      path: "/overview",
      name: "Overview",
      component: () => import("@/views/overview/index.vue"),
      meta: {
        title: "总览",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
