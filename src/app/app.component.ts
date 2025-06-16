import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MockServerService} from './server/MockServer.service';
import {debounceTime, filter, map} from 'rxjs';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormField, MatInput, ReactiveFormsModule, MatFormField, MatLabel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public urlControl = new FormControl("");
  public urlType = null;

  private regex = "([a-zA-Z]*:\\D\\D)([-a-zA-Z0-9@:%+~#=]*)(.[a-z]*)(\\D)(.*)";

  constructor(private mockServer: MockServerService) {
  }

  ngOnInit() {

    this.urlControl.valueChanges.pipe(
      filter(url => this.isUrlValid(url)),
      debounceTime(300),
      map(result => {

        const urlMatch = result.match(this.regex);
    console.log("Hallo!!")
        console.log(urlMatch);
        if(urlMatch){
          if(urlMatch[1].includes("://") && urlMatch[3].includes(".") && urlMatch[4].includes("/")){
        console.log(urlMatch);
            const pathName = urlMatch[5];
            this.mockServer.checkUrlPath(pathName).subscribe(result => this.urlType = result);

          }
        }else {
          console.log(this.urlControl.value);
        }
      })).subscribe();

  }

  private isUrlValid(url: string){
    const match = url.match(this.regex);
    return !!match?.[3];

  }

}
