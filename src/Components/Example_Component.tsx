import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// this variable is where all css styles are created for this component
// They are passed in via the useStyles method in the component function
const useStyles = makeStyles((theme) => ({

}));


// TODO: may need to define a props interface for each component before the function
// Props should never be modified by the component. They are read-only
interface props {
  // Whatever props we can use here
}
// We are using functional components in this example
// The only argument should be the props passed in via the parent
export default function Main(props: any) {
  // Applying the classes we saw above
  const classes = useStyles();

  interface User {
    firstName: string,
    lastName: string
  }

  // Here is where a lot of the logic for this component will be help
  // We can deal with conditionals, functions, state, and effects
  // before we define the template
  function formatName(user: User) {
    return user.firstName + " " + user.lastName;
  }

  const user: User = {
    firstName: "Max",
    lastName: "Broom"
  }

const element = <h1>Hello, {formatName(user)}</h1>

  // Here we build the actual template for the component, using an variables
  // that we've created in the above logic
  return (
    {element}
  );
}