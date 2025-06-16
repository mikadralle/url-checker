import {Injectable} from '@angular/core';
import {debounceTime, map, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MockServerService {

  private regex = /\.\w{2,5}$/;
  checkUrlPath(pathName: string){

    return of(pathName).pipe(
      debounceTime(200),
      map(pathName => {

        if(this.regex.test(pathName)){
          return "File"
        }else if (pathName.endsWith("/")){
          return "Folder"
        }else {
          return "NOT FOUND"
        }

      }));
  }

}
