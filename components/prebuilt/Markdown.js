/* eslint-disable react/display-name */
import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Image from "next/image";

const options = {
  overrides: {
    h1: {
      component: (props) => <Typography gutterBottom variant="h3" {...props} />,
    },
    h2: {
      component: (props) => <Typography gutterBottom variant="h4" {...props} />,
    },
    h3: {
      component: (props) => <Typography gutterBottom variant="h6" {...props} />,
    },
    h4: {
      component: (props) => (
        <Typography gutterBottom variant="subtitle1" paragraph {...props} />
      ),
    },
    p: {
      component: (props) => (
        <Typography paragraph style={{ fontSize: 20 }} {...props} />
      ),
    },
    a: { component: (props) => <Link {...props} /> },
    ul: {
      component: (props) => <ul style={{ marginLeft: 25 }} {...props} />,
    },
    li: {
      component: (props) => <li style={{ fontSize: 20 }} {...props} />,
    },
    img: {
      component: (props) => <Image {...props} width={1000} height={600} />,
    },
  },
};

function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}

export default Markdown;
