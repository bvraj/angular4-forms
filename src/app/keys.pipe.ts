import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value) {
    console.log(value);
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    console.log(keys);
    return keys;
  }
}