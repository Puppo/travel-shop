# Travel Shop

In this README you can find my thoughts about the exercise Travel Shop.

## Components

The micro frontend needs to handle and visualize three kinds of components

- product list
- product detail
- basket or cart

Another critical component for this project that takes part in the game is the header and the last one is the shell that orchestrates the other components.

Let's go dive into the details of each component [here](./Components/README.md)

## Technologies

The requirements for the project about performance are to satisfy the following criteria:

- LCP (Largest Contentful Paint)
- TTI (Time to Interactive)

So the application needs to be fast and responsive.

- must be small, and the download must be as less as possible.
- must be scalable and resilient and must serve users worldwide.
- must be multi-language (culture and locale)

The developer experience is crucial too, so the developers can reduce the time to market and the project's cost.

You can find more detail about the technologies [here](./Technologies/README.md)

## Processes

About the processes, you can find more detail [here](./Processes/README.md)

## Implementation

You can find a prototype of the project in the folder app.

To run the project, you need to run the [app](../app/README.md) and [api](../api/README.md) projects.

p.s. if you kill the api you have to clear the local storage of the browser otherwise the are problems with the basket, because the basket is stored in the local storage and in the memory in the fake api
