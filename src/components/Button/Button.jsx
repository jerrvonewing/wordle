import {
    BaseButton,
    InvertedButton,
  } from "./ButtonStyles.jsx";
  
  //Name:     Button
  //Type:     Functional Component
  //Input:    Props: children, buttonType, ...otherProps
  //Output:   <Button> Component
  //Purpose:  Read in the button type, and other properties, then returns it
  export const BUTTON_TYPES_CLASSES = {
    base: "base",
    inverted: "inverted",
  };
  
  const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
    ({
      [BUTTON_TYPES_CLASSES.base]: BaseButton,
      [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType]);
  
  const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
  };
  
  export default Button;