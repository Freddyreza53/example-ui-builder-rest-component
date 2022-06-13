### Custom Components in the Now Experience UI Framework Part 2: Actions and Action Handlers

In the last article, we walked through the process of initializing a custom component with ServiceNow ui-component cli tool, gave a brief overview of the boilerplate files and their function, and built a simple stateful component that tracks user input, and displays the information stored in the component state.

In this article, we'll set up our component to call the ServiceNow REST API with parameters input by the user, store the response in state, and render the result.

Though you add a call to the REST API just as you would in any project, it's best practice to keep our effectful code 