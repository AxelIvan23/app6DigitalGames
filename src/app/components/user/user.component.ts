import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private datos: DataService, private _activatedRoute: ActivatedRoute) { }

  resultados: any=[];

  ngOnInit(): void {

  	this._activatedRoute.params.subscribe( param => {
  		this.datos.getUser(param['id']).subscribe((datas:any) => {
	  		this.resultados = datas.data;
	  		console.log(this.resultados); 
	  	});
  	});
  }

}
