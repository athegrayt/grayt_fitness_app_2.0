import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const {parent} = props
  const cssClasses = [
		classes.modal,
		props.status ? classes.open : classes.close,
	].join(' ');
  const cssClassesContent = [
		classes.content,classes[parent]
	].join(' ');
  return (
		<div className={cssClasses}>
			<div className={classes.tab} onClick={props.clicked}></div>
			<div className={cssClassesContent}>{props.children}</div>
		</div>
	);
};
export default Modal;
