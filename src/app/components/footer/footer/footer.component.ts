import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  	phone = document.getElementById("spy-phone");
	num: number =5;

	cont() {
		this.num=this.num-1;
		if (this.num==0)
			this.Start_Call();
	}

	Start_Call() {

	}

}
