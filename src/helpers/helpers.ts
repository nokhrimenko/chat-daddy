/* eslint-disable import/prefer-default-export */
export interface ITag {
  name: string;
}

export function makeStringFromTagObject(tag: ITag) {
  return tag.name;
}

export function makeStringFromArray(tags: ITag[]) {
  return tags.map(makeStringFromTagObject).join(",");
}
