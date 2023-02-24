export default (S) => S.listItem()
  .title('Everything')
  .child(S.list().title('All Documents').items(S.documentTypeListItems()));
