import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../services/validation/validation.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormsModule, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  get validNombre() {
  	return this.form.get('nombre').invalid && this.form.get('nombre').touched && this.form.get('nombre').pristine;
  }
  get validCorreo() {
  	return this.form.get('email').invalid && this.form.get('email').touched && this.form.get('email').pristine;
  }

  get validTrabajo() {
  	return this.form.get('trabajo').invalid && this.form.get('trabajo').touched && this.form.get('trabajo').pristine;
  }

  get Pass1() {
  	return this.form.get("pass1").invalid && this.form.get("pass1").touched;
  }

  get Pass2() {
  	const pass1 = this.form.get('pass1').value;
  	const pass2 = this.form.get('pass2').value;
  	if (pass1 == pass2)
  		return false;
  	else 
  		return true;
  }

  constructor(private fb: FormBuilder, private CustomVal: ValidationService) {
  	this.CreateForm();
  }

  CreateForm() {
  	this.form = this.fb.group({
  		nombre: ['', [Validators.required, Validators.minLength(8)]],
  		email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
  		pass1: ['', Validators.required],
  		pass2: ['', Validators.required],
  		trabajo: ['', Validators.required]
  	});
  }

  ngOnInit(): void {
  }

  registrarse() { 
  	this.CustomVal.postUser().subscribe((datas:any) => {
  		console.log(datas);
  	});

  	if (this.form.invalid) {
  		return Object.values( this.form.controls ).forEach( control =>  {
  			if (control instanceof FormGroup) {
  				return Object.values(control.controls).forEach( control => control.markAsTouched());
  			} else {
  				control.markAsTouched();
  			}
  		});
  	} else {
  		 console.log(this.form);
  		console.log(this.CustomVal.postUser());
  	}
  }


}
