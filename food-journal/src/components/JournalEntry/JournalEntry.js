import React from "react";
import Button from '..//UI/Button/Button';
import classes from "./JournalEntry.module.css";

const JournalEntry = (props) => {
  const {meal} = props
  return(
    <div className={classes.JournalEntry}>
      {meal[0].entries.map((entry, i) => {
        return (
          <Button
            style={{ margin: '1vh 0' }}
            type='button'
            btnType='Success'
            key={entry.consumed_at}
            id={i}
            clicked={() => {
              props.setPage('nutriFacts');
              props.setFood(entry);
              props.setMeal(null);
            }}>
            {entry.food_name}
          </Button>
        );
      })}
    </div>
  ) 
}
  
export default JournalEntry;
