import { getCliClient } from 'sanity/cli';
const sanityClient = getCliClient().withConfig({
  apiVersion: '2022-04-10',
  dataset: 'production'
});

sanityClient
  .fetch({query: `*[_type == "company" && title == "Grapefruit Lab"][0]._id`})
  .then(console.log)
  .catch(console.error);
