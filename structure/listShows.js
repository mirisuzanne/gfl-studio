export default (S) => S.listItem()
  .title('Shows')
  .child(
    S.documentTypeList('show').defaultOrdering([
      { field: 'premierDate', direction: 'desc' },
    ])
  );
