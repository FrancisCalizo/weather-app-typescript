# WeatherCast

A mobile-first weather forecast application utilizing React.js, TypeScript, and TailwindCSS.

## Useful Articles

- Use of Date-fns library instead of moment.js (Much smaller library for performance) - https://date-fns.org/v2.14.0/docs/format

- TypeScript and Styling Types for React - https://fettblog.eu/typescript-react/styles/#inline-styles

- Custom Hooks Usage - https://reactjs.org/docs/hooks-custom.html | https://www.youtube.com/watch?v=5JSigy8E6vk | https://www.youtube.com/watch?v=yu3dnHrnps4

- Rules of Hooks - https://reactjs.org/docs/hooks-rules.html

- Less conditional Statements for returning JSX in functional components - Found a way to Return Components without so many conditional statements. Initial States should not be null, but Arrays or Objects. Start of with empty objects or arrays with type assertion. Then if trying to output properties or arrays, then using conditional operator (?) for variables.

- new Date was returning the day before with "yyyy-mm-dd" format. This link shows some "gotchas" when dealing with dates - https://stackoverflow.com/a/31732581

- Toggle in Tailwind - https://codepen.io/lhermann/pen/EBGZRZ

- More on React Events with TypeScript - https://fettblog.eu/typescript-react/events/

- Get user's current location with GeoLocation API - https://www.w3schools.com/html/html5_geolocation.asp

- Geolocation Types - https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.geolocation.html#getcurrentposition

- Local Storage with React - https://www.robinwieruch.de/local-storage-react

- JSON.stringify() and JSON.parse() with local storage objects - https://www.htmldog.com/guides/javascript/advanced/localstorage/#:~:text=var%20name%20%3D%20localStorage.,isn't%20right%20at%20all!

- TailwindCSS Setup with Create-React-App (fast!) - https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/

- CSS Modules with CRA (filename.modules.css) - https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/

- Import local image in React - https://stackoverflow.com/questions/39999367/how-do-i-reference-a-local-image-in-react

- Switch statement with a range of numbers - https://stackoverflow.com/questions/5619832/switch-on-ranges-of-integers-in-javascript

- String.substring() is considered legacy (basically deprecated) .. use slice() instead - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr

- Format Time in "12PM" format using the format object in Date-FNS - https://date-fns.org/v2.14.0/docs/format

- Figure out what hour it is with the getHours method in Date-FNS - https://date-fns.org/v2.14.0/docs/getHours

- Use Tailwind Styles in CSS stylesheet - https://tailwindcss.com/docs/adding-base-styles/

- Issues with Mobile browsers using hourly forecasts that were in Pacific Time instead of the current timezone. In HourForecastItem component, I was using use Date() function with the provided timestamp_local property and it would return 3-4 hours earlier time on mobile browsers. Found a workaround using the format on the bottom of this page https://date-fns.org/v2.14.0/docs/getHours. Using this format, the hours stays true to whatever the API is providing instead of getting the 3-4 hours on mobile. Weird.

- Simulate slow connections via network tab in developer tools - https://helpdeskgeek.com/networking/simulate-slow-internet-connection-testing/

- Was having an isssue when toggling the US/Global Button. I wanted to display city/state when it was US and city/country when it was global. Because the fetching of data was asynchronous and took a while, it would change from state to country and vice-versa before gathering all the data on render, resulting in seeing the state for global. This was fixed with a useEffect in the Location component with a location state as a dependency and having a "display" as local state. I tried many other things like trying to use callbacks with no avail.
