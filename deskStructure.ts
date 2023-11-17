import {CATEGORIES} from './constants'
import {Observable} from 'rxjs'
import {StructureResolver} from 'sanity/lib/exports/desk'

export const structure: StructureResolver = async (S, context) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem().title('Admin Tools:').showIcon(false),
      S.listItem()
        .title('Posts by category')
        .child(
          S.list()
            .title('Categories')
            .items(
              CATEGORIES.map((category) => {
                return S.listItem()
                  .title(category.title)
                  .child(
                    new Observable((subscriber) => {
                      const query = '*[_type == "post"]'

                      const updateList = () => {
                        subscriber.next(
                          S.documentList()
                            .title(category.title)
                            .filter(
                              '_type == "post" && $category == category && !(_id in path("drafts.**"))'
                            )
                            .params({category: category.value})
                        )
                      }

                      context.documentStore
                        .listenQuery(query, {}, {transitions: ['disappear']})
                        .subscribe(() => {
                          updateList()
                        })

                      updateList()
                    })
                  )
              })
            )
        ),
      S.divider(),
      ...S.documentTypeListItems(),
    ])
}
