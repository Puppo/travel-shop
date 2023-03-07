# Technologies

In this section you can find the technologies.

For this kind of project, where performance is a key factor, React is probably the best option in this moment.
The reasons are two:

1. React is one of the most performance frameworks in the market
2. It's easy to find developers with React skills

There are other frameworks like Svelte or Vue but with the current requirements, React is one of the best options.

There are some important points to take in mind with the requirements and choosing the best library for the project:
First, LCP and TTI, for this problem, there aren't library that can help us to improve the performance, but some best practice to follow:

1. Use a CDN to serve the static files, this help to reduce the latency and improve the performance.
2. Create small bundles, and split the component in small chunks, this help to reduce the size of the bundle and improve the performance
3. Take care on loading the images, this is a critical point for the performance, so we need to take care on the size of the images and the quality of the images. Webp is a good option to reduce the size of the images. Another option is to use a lazy loading for the images.
4. If the APIs are slow, cache the data, so in case of refresh the users don't have to waste time waiting for them but they are ready to use the application. To achive this goal, we can use react query. This library is a good option to create query and mutation actions, and it's possibile using it to cache the data and to invalidate the cache when the data is updated. This prevents the users to wait for the data in case of page refresh.

For the second point, scalability and resilience. In this case one solution is using a CDN to serve the static files of the application. This help to reduce the latency.

For the third point, multi-language, there are some libraries that can help us to implement this feature, in this case 18next and react-i18next are good options to achieve this goal. For the currency and the format there are some libraries like react-number-format and react-current-format, but in this case, I think that the best option is to use the Intl API.

For the UI consistency, probably of we have a strong brand, we have, or we need a design system. This helps the different teams have a common language and a common way to implement the UI. The best solution in this case, it's have a dedicated team to implement it and the UI components.

For the developer experience, in this case I prefer to move the project to Nx, with the standalone configuration. Nx permits to have a code base divided into applications and libraries. This helps the team to have a better organization of the code. Then nx is able to test only the affected code, so the developer can save time and improve the performance of the pipeline. Nx is also able to create a dependency graph of the project, so the developer can have a better understanding of the project and the dependencies between the different parts of the project.

Other technologies are:

- react-router-dom: probably the best option to implement the routing in react
- zod: a library to validate the data, this helps to have a better control of the data and to avoid errors, the combo zod and typescript is awesome
