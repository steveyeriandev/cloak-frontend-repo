## Description

Provides the react frontend web application for the Cloak project.

## Installation

1. `yarn install`
2. `yarn start`

## Deployment

The application is deployed through AWS using an S3 Static site along with Cloudfront at the edge. In general, deployment will update the S3 static site, and then invalidate the existing Cloudfront cache. Before you can deploy, there are a few setup steps involved:

1. Install [aws-cli 2.x](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. `aws configure` you'll need to ask for the IAM frontend-deploy credentials
3. aws configure creates a "default" user, however to work with our package.json scripts you'll need to update that to "cloak-frontend" in your `~/.aws/credentials` file.
4. The default region for aws setup should be `us-west-1`

Once these steps are complete, we can deploy to two different environments:

`yarn deploy-staging` or `yarn deploy-prod`

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

### Data Management

Generally speaking, we have a service layer (services within the `features` directory) that should be used, having one service for each different resource. These services may be called directly, or they might be called by a thunk, if it's needing to be stored in application redux state. Redux
usage should follow the standards set by [redux-toolkit](https://redux-toolkit.js.org/) as best as possible.
