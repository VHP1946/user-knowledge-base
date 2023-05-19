## TODO

#### Document:

- Paragraph

- DataTable

- TableRow

- JSONDataTable

- JSONObjectForm

- JSONRow

- InputForm

- Canvas
# React Component Guide

Below is a documentation guide to using the React library. This guide lists only components to be used in your application itself - internal components like the ButtonContainer, etc will not be documented here and should not be used in an application.

## App Box and Setting up your first Application

### Installation

The component library can be install by running  ***npm install vhp-component-library*** inside of a react application.

### Initial Setup

To initialize an app, first create a react app using [create-react-app.](https://github.com/facebook/create-react-app) Once you have created an app, pull in this react repo into a Components folder located inside your application's src directory. Create an *Apps* folder inside src. To create your first application, create a folder with your app name. Copy and paste the **SampleApp.jsx** file from **Components/Templates** into your app folder. Rename the file to *YourAppName*App.jsx and rename the class SampleApp to *YourAppName*App. Create a folder instead your app folder named *Containers*.

### Run Application

Before you run npm start, you must pass your application into the application itself. In **App.js**, go to the DevApp class. Within this class, go to the *renderApp()* function. In the return, add your component inside the root div. Next, from a command line in the root directory, run *npm install* and then *npm start*. Now, you can begin adding components and containers to your application in it's app component.

### Creating a container

Each App file is defaulted to include a menu bar with a *SetTab* function. This allows you to switch between pages in the application. This default behavior can be removed, customized, or expanded.

### Styling

Base components pull from a style file located in Style within Components. Styles for an app can be customized by adding CSS files to the Styles folder within your application folder.

# Component API
#### A guide to using the VHP React Components to create an application. Assume all components by default have customizable ids, however some may be missing depending on how they're being created. Please document where id is missing.

#### Certain components support a customizable [component]Class. This functionality replicates adding a class, so one can string classes together. Note this functionality should not be used for show/hide functionality, as the class is only set on component mount. Refer to the functionality guide for information on how to create a toggleable component using state.

#### See the naming convention guide for a more detailed view at the naming of props, functions, and components.

#### Note that each component also has documentation attached to it, which may not be here.

## *Containers*

Containers are components which are the basis of an application and will by default display all of their children. Each container can be customized using a class or id.

**AppContainer**: A basic container used for containing an application. Can hold any object other than another container.

>*containerClass*: the CSS class of the component.

---

**FloatContainer**: A floating container used for containing an application. Features a dark semi-transparent background which takes up the entire screen. Can be used to contain floating elements, such as editable forms or save dialogues.

>*containerClass*: the CSS class of the component.

## *Cards*

Cards are elements which can be used to hold and display a variety of different components, including tables, forms, buttons, and menus. A card can be the entirety of your application, or your application can be made up of a variety of different cards.

**Card**: The outermost card element, used to hold any *CardContent* elements which contain your data. By default, a Card contains a single *CardContent* element which displays the children of the card.

>*cardClass*: the CSS class of the component.

>*titlebar*: boolean to determine whether the card will have a *CardTitlebar* component. See *CardTitlebar* documentation for details on its properties.


---

**CardContent**: The inner container of a card which holds its content. A *Card* may contain multiple *CardContent* elements. By default, displays its children elements inside it.

>*cardContentClass*: the CSS class of the component.

---

**CardTitlebar**: A customizable titlebar for a *Card* element. Can be customized to support a number of actions. Currently, close and minimize are planned, however dynamic actions can be added in the future. Note that due to the way it currently works, when providing actions, you must provide both, and you **must** provide data, even if its just set to null.

>*title*: string, title to display.

>*actions*: {minimize: function, close: function} table of functions which make up the titlebar.

>*data*: {minimize: data or null, close: data or null} data passed into the function of each action.

---

## *Buttons*

Buttons are components which enable a basic level of interactivity between the application and the user. Each button internally is a ButtonContainer component, however a ButtonContainer should not be used in an application.

**TextButton**: A basic button which supports clicking.

>*buttonClass*: the CSS class of the component.

>*ButtonType*: the type of button. Used for setting base CSS customization. Defaults to action-button.

>*text*: text to display over the button.

>*ClickFunction*: the function activated by clicking the button. Replicates onClick().

>*data*: the data being passed into the ClickFunction. To pass in more than one property, pass as an array or object as specified by your click function.

**ImageButton**: Identical to the TextButton, but with the ability to specify an image and optional text.

>*src*: image to display on the button.

---

## *DropDowns*

A dropdown class fills the role of the HTML *select* element, with additional functionality and customization. Like the HTML select, a DropDown is composed of two things: a DropDown, and a set of options.

**DropDown**: the base of the DropDown, replicating the HTML select.

>*searchable*: boolean which determines whether a search bar will be displayed. Currently, only supports text filtering however can be expanded to support other filtering types in the future.

>*data*:object passed into ChangeFunction from the parent component, for example, the key of the object in state.

>*list*: array of {text:string, value:string} which are mapped to *DropOption* components.

>*ChangeFunction*: Function called when changing the selected element. Passes the new value into the function.

**DropOption**: Replicates the HTML option tag. Internal component use only.

**MultiSelectDropDown**: a DropDown which allows multiple selections

>*data*:object passed into ChangeFunction from the parent component, for example, the key of the object in state.

>*list*: array of {text:string, value:string} which are mapped to *DropOption* components.

>*ChangeFunction*: Function called when changing the selected element. Passes the new value into the function.

---

## *Lists*

A list class fills the role of the standard list HTML elements. Note that right now, only a numbered list is supported.

---
## *Tables*

---

## *JSON Objects*

---

## *Static Objects*

A collection of basic text and image objects that can be used to replicate images, paragraphs, and headers.

---

## *ViewControllers*

A set of controllers that can be used to create menus and pages. A combination of components and CSS can be used to customize the look and functionality of different menu types.

## License

MIT © [mathewh-vhc](https://github.com/mathewh-vhc)
