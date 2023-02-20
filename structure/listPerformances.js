import { getCliClient } from 'sanity/cli';

const sanityClient = getCliClient().withConfig({ apiVersion: '2022-04-10' })

const query = /* groq */ `{
  "shows": *[_type == "show" && !(_id in path("drafts.**"))]{title, _id},
  "perfs": *[_type == "performance" && !(_id in path("drafts.**"))]{
    _id,
    "title": show->.title,
    date, "venue": venue->.title
  }
}`

export default (S) => S.listItem()
  .title('Performances')
  .child(async () => {
    const { shows, perfs } = await sanityClient.fetch(query)
    return S.list()
      .title('Shows')
      .items([
        ...shows.map((show) =>
          S.listItem()
            .title(show.title)
            .child(
              S.list()
                .title('Performances')
                .items([
                  ...perfs.map((perf) =>
                    S.listItem()
                      .id(perf._id)
                      .title(perf.date)
                      .child(
                        S.documentList()
                          .title('Tickets')
                          .filter(
                            '_type == "ticket" && performance._ref == $perfId'
                          )
                          .params({ perfId: perf._id })
                      )
                  ),
                ])
            )
        ),
      ])
  })
