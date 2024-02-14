/* IMPORTS
  You can import directly from node_modules here.
*/
/*
  VENDOR IMPORTS
  Libraries from other sources, should already be minified.
*/
//import $ from "./vendor/jquery-4.0.0-beta.slim.min";
import $ from "jquery";

/*
  LIBRARY IMPORTS
  Utilities, plugins, and helpers that aren't tied to a specific component.
*/
import exampleLib from "./lib/example-lib";

/*
  COMPONENT IMPORTS
  For specific components or collections of components only.
*/
import accordion from "./components/accordion";
import tabset from "./components/tabset";


// Global/console access to JQuery through '$';
window.$ = $;



// FOUC on-fully-loaded make the page visible:
addEventListener('load', (e) => {
  document.documentElement.style.visibility = 'visible';
});




/* INITIALIZATION */
$(() => {
  $("body").addClass("document-ready");

  /* Higher priority first, lower priority later */
  exampleLib();
  tabset();
  accordion();
});
