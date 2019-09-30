import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd = true;
  @ViewChild('clientForm', null) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //show error
      this.flashMessage.show('Please Correct Form', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add New Client
      this.clientService.newClient(value);
      // Show Message
      this.flashMessage.show('New Client Added!', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect to Dashboard
      this.router.navigate(['/']);
    }
  }
}
