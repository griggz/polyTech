import introduction from "../../components/prebuilt/posts/web_development/introduction.md";
import Post from "../../components/views/Post";
// MUI
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const sections = [
  { title: "Our Process", url: "#" },
  { title: "Apps", url: "#" },
  { title: "Dashboards", url: "#" },
  { title: "Tailored Solutions", url: "#" },
];

const mainFeaturedContent = {
  title: "Build something uniquely tailored to your vision",
  description: [
    "Deploying effective web experiences is integral to any succesful project.",
    "Whether its a dashboard, a simple visualization, or an entire website, ",
    "we cover the breadth of what's possible.",
  ].join(" "),
  image:
    "https://images.unsplash.com/photo-1584291527908-033f4d6542c8?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const sidebar = {
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Web() {
  return (
    <Post
      posts={[introduction]}
      sections={sections}
      mainFeaturedContent={mainFeaturedContent}
      sidebar={sidebar}
    />
  );
}
