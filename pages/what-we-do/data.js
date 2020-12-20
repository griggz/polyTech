import introduction from '../../components/prebuilt/posts/web_development/introduction.md';
import Post from '../../components/views/Post'
// MUI
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const sections = [
    { title: 'Our Process', url: '#' },
    { title: 'Engineering', url: '#' },
    { title: "Automation", url: '#' },
    { title: "Data Management", url: '#' },
    { title: "Visualization", url: '#' },
  ];

const mainFeaturedContent = {
  title: "Make your data work for you",
  description: [
    "Our engineers can take the most unorganized data sets and create something beautiful.",
    "We'll tame your data while providing you with a custom foundation to enable long term growth and success.",
    "We do charts too :)."].join(' '),
  image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format',
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

export default function Data() {

  return (
      <Post
        posts={[introduction]}
        sections={sections}
        mainFeaturedContent={mainFeaturedContent}
        sidebar={sidebar}
        />
  )
}