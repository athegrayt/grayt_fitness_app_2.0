import React from "react";
import classes from "./JournalEntry.module.css";
import PropTypes from "prop-types";
import { timeFormatConvert } from "../../shared/utility";

const JournalEntry = (props) => {
  const { serving_qty, food_name  } = props.entry;
  let { consumed_at, serving_unit } = props.entry;
  consumed_at = timeFormatConvert(consumed_at);
  if(serving_unit.length > 5){
    serving_unit = serving_unit.slice(0,6)
  } 
  let description = `${serving_qty} ${serving_unit} of ${food_name}`;
  if (food_name === serving_unit) {
    description = `${serving_qty} ${food_name}`;
  }

  return (
    <div
      id={props.id}
      className={classes.JournalEntry}
      onClick={props.deleteRequestHandler}
    >
      <p>{consumed_at}</p>
      <p>{description}</p>
    </div>
  );
};
JournalEntry.propTypes = {
  deleteRequest: PropTypes.bool,
  deleteRequestHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  time: PropTypes.string,
  description: PropTypes.string,
  calories: PropTypes.number,
  id: PropTypes.number,
};

export default JournalEntry;
