/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrescriptionService } from './prescription.service';

describe('Service: Prescription', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrescriptionService]
    });
  });

  it('should ...', inject([PrescriptionService], (service: PrescriptionService) => {
    expect(service).toBeTruthy();
  }));
});
