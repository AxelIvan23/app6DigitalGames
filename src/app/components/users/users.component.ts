import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private datos : DataService, private route: Router) { }

  resultados : any = [];

  ngOnInit(): void {
  	this.UserCards();
  }
  
  UserCards() {
  	this.datos.getUsers(1).subscribe((datas:any) => {
  		this.resultados = datas.data;
  		console.log(this.resultados);
  	});
  }

  enviar(id) {
  	this.route.navigate(['user/',id]);
  }
}
