import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

export default function MuiTooltip(props) {
  const { text, children } = props;

  return (
    <Tooltip
      title={text}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
    >
      {children}
    </Tooltip>
  );
}
