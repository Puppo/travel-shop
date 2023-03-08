# Processes

## Development

For the development phase, Nx with standalone project is the solution as said before.
For the source control, Git is the best one, with the trunk base development flow.
A branch main where all the feature branches will be merged.
Each new feature will be developed in a new branch, and when the feature is ready, the branch will be merged into the main one by a PR. The PR will be reviewed by another developer and each PR must pass the pipeline.
There are three environments, development, production and features.
Production and development are always in sync with the main branch, so all the new features will be deployed directly in production. If a branch must be merged but it's not ready to be visible, there is a feature flag to hide the feature.
Each feature branch must be tested in its own environment before being merged into the main branch.

## Testing

There are three phases of testing: unit testing and integration testing, e2e testing and human testing.
CI covers:

- unit/integration tests
- e2e tests
  The human testing is done by the QA team or by the team if the QA is not available

## CI/CD

CI/CD is done by Github Actions; there are three workflows:

- lint: run the linter and check the formatting (this could be done using e git hook too)
- build: build the project
- test: run the unit/integration tests and the e2e tests (this phase must release the code in a test environment)
- deploy: deploy the project in the different environments (production, development, features, in base on the branch will trigger the CI)

## Deployment

The deployment is done by Github Actions and the static files will release in a AWS S3 bucket. There is a CloudFront distribution in front of the S3 bucket to serve the static files. This reduces the latency.
There are three S3 buckets, one for production, one for development and one for features. Each feature creates a new folder in the features bucket and uses it to release the code.

## Observability

For observability, New Relic is the solution. It's possible to have a good overview of the application and the performance of the different parts of the application.
There are some points that we have to take care of:

- API calls response time
- API calls response format

The first point is important to check if everything is ok, and the second one is important to have good control of the data and to avoid errors.
To achieve the first point we can use the New Relic Browser, to check the response time of the API calls. To achieve the second point we can use zod to validate the data, if the data is not valid, the application will throw an error. Each main component is wrapped in a custom Error Boundary, so in case of error, the user will see a custom error message and the application log the problem in New Relic.
On New Relic we can create some rules to alert us if something is wrong, in this way we can react quickly and fix the problem.
