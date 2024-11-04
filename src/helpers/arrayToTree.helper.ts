export const nest = (items: Array<any>, id = null, link = 'ParentId'): any => {
    return items.filter(item => item[link] === id)
      .map((item: any) => {
        const children = nest(items, item.Id);
        return {
          ...item,
          children: children.length ? children : null
        }
      })
  };