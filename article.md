# Building a Custom Table Component for Use in the Now Experience UI Builder

While the Now Experience UI Builder provides a number of built-in components for constructing experiences, sometimes you may want to tweak an existing component beyond what's possible in the UI Builder, or even create your own component from scratch. In this article, we'll walk through the process of creating a custom component, setting up action handlers to call the Service Now REST API, and configuring the component to accept custom parameters passed to it through the UI Builder interface.

This article assumes you have node, the ServiceNow CLI, and the ui-component CLI extension already installed. If not, check out [this article on setting up the development environment on MacOS](https://creator-dna.com/blog/macos-setup), or [this article for getting started on Windows](https://creator-dna.com/blog/1hj866nlrwslzlesekt0c14grhh8u1).

## Project Initialization and First Look

Once our CLI tools are installed and our dev environment is ready, we can create and navigate to our new project folder by opening a terminal and running:

`mkdir my-project-name && cd my-project-name`

Then, we initialize our project by running the project command along with the `--name` and `--description` flags. You can also provide a scope with the optional `--scope` flag. 

`snc ui-component project --name my-project-name --description "Our Project Description"`

<img src="images/First-Look_1.png" alt="Example of a terminal command to initialize a new ui-component project"/>

> Note: If you don't have internet or access to your instance, you'll have to use the `--offline` flag as well as providing a custom scope with the `--scope` flag.

The ui-component CLI will then create the boilerplate files for the project. If it prompts you to update yo, do so with `npm install -g yo`.

Now that the project's been scaffolded, we're almost ready to take a look at our new component. Run `npm install` to install the project dependencies (this may take a few minutes).

While the dependencies are installing, let's take a look at the files that have been added to the project folder:

The `now-ui.json` is where we configure the details of our new component, including how this component appears and interacts with the UI Builder interface. We'll add more to it later, but for now, the appearance of the component in the UI Builder menus (label, icon, description) can be set in this file.
<img src="images/First-Look_2.png">


 `snc ui-component develop` to start the development server - this should automatically open your default web browser to display the scaffolded component.