import chunk from "lodash/chunk";

export default function example() {
  let chunked = chunk(['a', 'b', 'c', 'd'], 2);

  $('body').addClass('reverse-override');
  console.log('example library loaded. chunk: '+ chunked);
}
