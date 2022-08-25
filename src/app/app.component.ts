import { SQLiteService } from './services/sqlite.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqliteService: SQLiteService) {
    
    this.init();
  }
  async init(){
    await this.sqliteService.initializePlugin().then(async (ret) => {
      try {
        const secretPhrase = 'abbey clammy gird night test';
        const isSet = await this.sqliteService.isSecretStored()
        console.log("ISSET ",isSet);
        
        if(!isSet.result) {
            await this.sqliteService.setEncryptionSecret(secretPhrase);
        } else {
          return Promise.reject(new Error("the secret is already stored"));
        }
        
      } catch (error) {
        throw Error(`initializeAppError: ${error}`);
      }

    });
  }

}
