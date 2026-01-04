import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
  providers: [DatePipe]
})
export class VisitorsComponent implements OnInit {
  visitorForm: FormGroup;
  submitted = false;

  purposes = [
    'General Enquiry',
    'Third Party Manufacturing',
    'Bulk Order',
    'Export Enquiry',
    'Vendor / Supplier',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.visitorForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      company: [''],
      visitorType: ['Client'],
      purpose: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      contactPreference: ['Phone'],
      consent: [false, Validators.requiredTrue],
      visitDate: [{ value: new Date().toISOString().substring(0, 10), disabled: true }]
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  submit(): void {
    this.submitted = true;

    if (this.visitorForm.invalid) {
      return;
    }

    const visitorData = {
      ...this.visitorForm.getRawValue(),
      submittedAt: this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss')
    };

    const existing =
      JSON.parse(localStorage.getItem('visitor_data') || '[]');

    existing.push(visitorData);

    localStorage.setItem('visitor_data', JSON.stringify(existing));

    alert('Thank you! Your enquiry has been submitted.');

    this.visitorForm.reset({
      visitorType: 'Client',
      contactPreference: 'Phone',
      consent: false
    });

    this.submitted = false;
  }

}
