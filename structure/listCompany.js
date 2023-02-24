import { getCliClient } from 'sanity/cli';
import logo from '../components/Logo';


const sanityClient = getCliClient().withConfig({ apiVersion: '2022-04-10' });

const mainCompany = 'Grapefruit Lab'; // <-- enter main company title here
const companyQuery = sanityClient.fetch(
  `*[_type == "company" && title == "${mainCompany}"][0]._id`
);

export default (S) => S.listItem()
  .title('Company')
  .icon(logo)
  .child(() => {
    return companyQuery.then((res) => {
      return S.document().schemaType('company').documentId(res);
    });
  });
