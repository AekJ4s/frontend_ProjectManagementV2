import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFileService } from '../../services/UploadFile.service';

@Component({
  selector: 'projectCreate',
  standalone: true,
  templateUrl: './uploadFile.components.html',
  styleUrls: ['./uploadFile.components.css'],
  imports: [FormsModule, CommonModule],
})
export class UploadFileComponent {
  files: File[] = [];
  fileURLs: { [key: string]: string } = {};
  show_url = '';

  constructor(
    private uploadService: UploadFileService,
    private router: Router
  ) {}

  deleteSelect(index: number){
    this.files.splice(index,1) // ลบแค่ตัวปัจจุบัน
  }
  uploading(event: any) {
    const selectedFiles: FileList = event.target.files;
    Array.from(selectedFiles).forEach(file => {
      this.files.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileURLs[file.name] = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    if (this.files.length > 0) {
      console.log("Selected files:", this.files);
    } else {
      alert("No files selected");
    }
  }

  onSubmit() {
    
    if (this.files.length > 0) {
      this.uploadService.UploadFile(this.files).subscribe(
        (result) => {
          alert('Files uploaded successfully');
        },
        (error) => {
          alert('File upload failed');
          console.log(error);
        }
      );
    } else {
      alert('No files selected.');
    }
  }
}
