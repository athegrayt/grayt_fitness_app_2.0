import React from "react";
import Button from '..//UI/Button/Button';
import classes from "./JournalEntry.module.css";

const JournalEntry = (props) => {
  const {curMeal, parent} = props
  return(
    <div className={classes[`JournalEntry-${parent}`]}>
      {curMeal[0].entries.map((entry, i) => {
        return (
          <Button
            style={{ margin: '1vh 0', width:'80%' }}
            type='button'
            btnType='Success'
            key={entry.consumed_at}
            id={i}
            clicked={() => {
              props.setPage('nutriFacts');
              props.setFood(entry);
              props.setMeal(null);
              props.setBreakdown(true)
              props.setEntryMeal(curMeal[0].name)
            }}>
            {entry.food_name}
          </Button>
        );
      })}
    </div>
  ) 
}
  
export default JournalEntry;
