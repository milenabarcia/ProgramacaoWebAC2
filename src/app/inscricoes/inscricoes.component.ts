import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export function validarDatas(group: AbstractControl): { [key: string]: any } | null {
  const dataInicio = group.get('dataInicio')?.value;
  const dataTermino = group.get('dataTermino')?.value;

  return dataInicio && dataTermino && dataInicio > dataTermino
    ? { datasInvalidas: true }
    : null;}

@Component({
  selector: 'app-inscricoes',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})

export class InscricoesComponent implements OnInit {
  inscricaoForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.inscricaoForm = this.fb.group(
      {
        evento: ['', Validators.required],
        modalidade: ['', Validators.required],
        dataInicio: ['', Validators.required],
        dataTermino: ['', Validators.required],
        participantes: this.fb.array([])
      },
      { validators: validarDatas }
    );
  }

  ngOnInit(): void {

    const dadosSalvos = localStorage.getItem('inscricao');
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);


      if (dados.participantes && dados.participantes.length > 0) {
        dados.participantes.forEach(() => this.adicionarParticipante());
      }


      this.inscricaoForm.patchValue(dados);
    }


    this.inscricaoForm.valueChanges.subscribe(value => {
      localStorage.setItem('inscricao', JSON.stringify(value));
    });
  }


  get participantes(): FormArray {
    return this.inscricaoForm.get('participantes') as FormArray;
  }


  adicionarParticipante(): void {
    const participanteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      tipoIngresso: ['', Validators.required]
    });
    this.participantes.push(participanteForm);
  }


  removerParticipante(index: number): void {
    this.participantes.removeAt(index);
  }


  onSubmit(): void {
    if (this.inscricaoForm.valid) {
      console.log('Dados enviados:', this.inscricaoForm.value);
      localStorage.removeItem('inscricao');
    } else {
      console.log('Formulário inválido');
    }
  }
}
