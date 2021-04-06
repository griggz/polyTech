import TypeIt from "typeit-react";
import PropTypes from "prop-types";

const Typer = (props) => {
  return props.options ? (
    <TypeIt
      options={{
        speed: 100,
        loop: true,
      }}
      getAfterInit={(instance) => {
        props.options.map((d) => {
          instance
            .type(d)
            .pause(1000)
            .delete(0 - d.length);
          return instance;
        });
      }}
    />
  ) : (
    "Business."
  );
};

Typer.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Typer;
