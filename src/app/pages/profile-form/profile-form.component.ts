import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainerService } from '../../services/trainer.service';
import { TrainerProfile } from '../../models/trainer.model';
import { MatIconModule } from '@angular/material/icon';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { ChangeDetectorRef } from '@angular/core';

const HOBBY_SUGGESTIONS = [
  'Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis',
  'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos',
  'Ver Series', 'Ver Películas', 'Leer', 'Cocinar'
];
@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, MatIconModule, LoadingScreenComponent, MatIconModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})

export class ProfileFormComponent implements OnInit {
  form!: FormGroup;
  fotoUrl = '';
  fotoNombre = '';
  nombre = '';
  fotoError = false;
  hobbySuggestions: string[] = [];
  showSuggestions = false;
  selectedHobby = '';
  esAdulto = true;
  fechaHoy = new Date().toISOString().split('T')[0];
  showLoading = false;
  cumpleFocused = false;
  ifEdit = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private trainerService: TrainerService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ifEdit = this.route.snapshot.queryParamMap.get('from') === 'home';
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      hobby: [''],
      birthday: ['', Validators.required],
      document: ['']
    });

    // birthday changes to toggle document validation
    this.form.get('birthday')!.valueChanges.subscribe((val) => {
      this.validarDUI(val);
    });

    this.form.get('hobby')!.valueChanges.subscribe((val) => {
      if (val && !this.selectedHobby) {
        this.hobbySuggestions = HOBBY_SUGGESTIONS.filter(h =>
          h.toLowerCase().includes(val.toLowerCase())
        );
        this.showSuggestions = this.hobbySuggestions.length > 0;
      } else {
        this.showSuggestions = false;
      }
    });

    // Pre fill form if editing
    const profile = this.trainerService.profile;
    if (profile) {
      this.form.patchValue({
        nombre: profile.nombre,
        hobby: profile.hobby,
        cumple: profile.cumple,
        documento: profile.documento
      });
      this.nombre = profile.nombre;
      this.selectedHobby = profile.hobby || '';
      this.fotoUrl = profile.fotoUrl;
      this.fotoNombre = profile.fotoNombre;
      if (profile.cumple) {
        this.validarDUI(profile.cumple);
      }
    }
  }

  private validarDUI(cumple: string): void {
    const edad = this.trainerService.getEdad(cumple);
    this.esAdulto = edad >= 18;
    const docControl = this.form.get('document')!;

    if (this.esAdulto) {
      docControl.setValidators([Validators.required, Validators.pattern(/^\d{8}-\d$/)]);
    } else {
      docControl.clearValidators();
    }
    docControl.updateValueAndValidity();
  }

  fotoSeleccion(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) return;

      this.fotoNombre = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoUrl = e.target?.result as string;
        this.fotoError = false;
      };
      reader.readAsDataURL(file);
    }
  }

  borrarFoto(): void {
    this.fotoUrl = '';
    this.fotoNombre = '';
  }

  // Auto format DUI with hyphen after 8th digit
  onDocumentInput(event: Event): void {
    if (!this.esAdulto) return;
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 8) {
      value = value.substring(0, 8) + '-' + value.substring(8);
    }
    this.form.get('document')!.setValue(value, { emitEvent: false });
    input.value = value;
  }

  get isFormValid(): boolean {
    return this.form.valid && !!this.fotoUrl;
  }

  onContinue(): void {
    if (!this.fotoUrl) {
      this.fotoError = true;
      return;
    }
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const profile: TrainerProfile = {
      nombre: this.form.value.name,
      hobby: this.selectedHobby,
      cumple: this.form.value.birthday,
      documento: this.form.value.document || '',
      tipoDocumento: this.esAdulto ? 'DUI' : 'Carnet de Minoridad',
      fotoUrl: this.fotoUrl,
      fotoNombre: this.fotoNombre
    };
    this.trainerService.setPerfil(profile);
    this.showLoading = true;
    // Show loading for at least 0.5s so the gif is visible
    setTimeout(() => {
      this.router.navigate(['/team']);
    }, 500);
  }

  esconder(): void {
    // Delay to allow click on suggestion
    setTimeout(() => this.showSuggestions = false, 200);
  }

  selecccionarHobby(hobby: string): void {
    this.selectedHobby = hobby;
    this.form.get('hobby')!.setValue('');
    this.showSuggestions = false;
  }

  borrarHobby(): void {
    this.selectedHobby = '';
  }

  regresar(): void {
    this.showLoading = true;
    setTimeout(() => this.router.navigate(['/home']), 500);
  }

}
