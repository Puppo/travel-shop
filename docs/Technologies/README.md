# Technologies

In this section, you can find the technologies.

For this kind of project, where performance is a key factor, React is probably the best option at this moment.
The reasons are two:

1. React is one of the most performance frameworks in the market
2. It's easy to find developers with React skills

There are other frameworks like Svelte or Vue but with the current requirements, React is one of the best options.

There are some important points to take in mind with the requirements and choosing the best library for the project:
First, LCP and TTI, for this problem, there aren't libraries that can help us to improve the performance, but some best practices to follow:

1. Use a CDN to serve the static files, this help to reduce the latency and improve the performance.
2. Create small bundles, and split the component in small chunks, this help to reduce the size of the bundle and improve the performance
3. Take care of loading the images, this is a critical point for the performance, so we need to take care of the size of the images and the quality of the images. Webp is a good option to have good images with small size. Another option is to use lazy loading for the images.
4. If the APIs are slow, cache the data, so in case of refresh the users don't have to waste time waiting for them but they are ready to use the application. To achieve this goal, we can use react query. This library is a good option for creating query and mutation actions, and it's possible using it to cache the data and to invalidate the cache when the data is updated. This prevents the users to wait for the data in case of page refresh.

The second point is scalability and resilience. In this case one solution is using a CDN to serve the static files of the application. This help to reduce the latency.

For the third point, multi-language, there are some libraries that can help us to implement this feature; in this case i18next and react-i18next are good options to achieve this goal. For the currency and the format, there are some libraries like react-number-format and react-current-format, but in this case, I think that the best option is to use the Intl API.

For UI consistency, we probably have a strong brand, so we need a design system. This helps the different teams have a common language and a common way to implement the UI. The best solution in this case, it has a dedicated team to implement it and the UI components.

For the developer experience, in this case, I prefer to use Nx, with the standalone configuration. Nx permits to have a code base divided into applications and libraries. This helps the team to have a better organization of the code. Then nx is able to test only the affected code, so the developer can save time and improve the performance of the pipeline. Nx is also able to create a dependency graph of the project, so the developer can have a better understanding of the project and the dependencies between the different parts of the project.

Other technologies are:

- react-router-dom: probably the best option to implement the routing in react
- zod: a library to validate the data; this helps to have better control of the data and to avoid errors; the combo zod and typescript is awesome
- vitest: for the unit testing, it's a good option to have fast and reliable test
- playwright: for the e2e testing
- newrelic for the observability of the application
