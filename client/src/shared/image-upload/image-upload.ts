import { Component, inject, input, OnDestroy, output, Sanitizer, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  protected imageSrc = signal<SafeUrl | null>(null);
  private objectUrlRaw: string | null = null;

  protected isDragging = signal(false);
  private fileToUpload: File | null = null;
  uploadFile = output<File>();
  loading = input<boolean>(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  onCancel() {
    this.fileToUpload = null;
    this.imageSrc.set(null);
  }

  onUploadFile() {
    if (this.fileToUpload) {
      this.uploadFile.emit(this.fileToUpload);
    }
  }
  private previewImage(file: File) {
    // LIMPIEZA PREVIA: Si ya había una imagen cargada, liberamos esa memoria
    if (this.objectUrlRaw) {
      URL.revokeObjectURL(this.objectUrlRaw);
    }
    // CREACIÓN: Generamos la URL blob (ej: "blob:http://localhost:4200/...")
    this.objectUrlRaw = URL.createObjectURL(file);

    // SEGURIDAD: Le decimos a Angular que confíe en esta URL
    this.imageSrc.set(this.sanitizer.bypassSecurityTrustUrl(this.objectUrlRaw));
  }

  // LIMPIEZA FINAL: Cuando el componente se destruye (el usuario cambia de página)
  ngOnDestroy() {
    if (this.objectUrlRaw) {
      URL.revokeObjectURL(this.objectUrlRaw);
    }
  }
}
