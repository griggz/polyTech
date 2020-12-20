import introduction from '../../components/prebuilt/posts/web_development/introduction.md';
import Post from '../../components/views/Post'
// MUI
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const sections = [
    { title: 'Our Process', url: '#' },
    { title: 'Apps', url: '#' },
    { title: "Dashboards", url: '#' },
    { title: 'Tailored Solutions', url: '#' }
  ];

const mainFeaturedContent = {
  title: 'Build something uniquely tailored to your vision',
  description: [
    "Deploying effective web experiences is integral to any succesful project.",
    "Whether its a dashboard, a simple visualization, or an entire website, we",
    "we cover the breadth of what's possible."].join(' '),
  image: 'https://images.unsplash.com/photo-1584291527908-033f4d6542c8?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format',
  imgText: 'main image description',
  linkText: 'Continue reading…',
  };

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
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
  )
}