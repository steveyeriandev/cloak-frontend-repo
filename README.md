## Description

Provides the react frontend web application for the project.

## Installation

1. `yarn install`
2. `yarn start`

## Testing

Currently there is no unit or integration testing in the project.

## Architecture

### Project Structure

1. components - general presentation components that are used throughout the project
2. features - files dealing with redux and data services
3. hooks - project hooks that can give reusable hooks to our components
4. routes - our route structure which uses @reach/router
5. styles - global styling files
6. utils - general reusable utility functions that are used throughout the project

### Styling

There is a mixture of [react-bootstrap](https://react-bootstrap.github.io/) as a base style and having [styled-components](https://styled-components.com/) on top of the base bootstrap styling and components. When wanting to modify base styling, first you should check the [bootstrap sass variables](https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss) to see if there's an easy global variable to change for that. If the variable is also needed with styled components usage, then you may add it into the theme in `app.js` as well, which then propogates to all styled components according to their [theming(https://styled-components.com/docs/advanced#theming) functionality.
