
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonProviderService } from './CommonProvider.service';

describe('Service: CommonProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonProviderService]
    });
  });

  it('should ...', inject([CommonProviderService], (service: CommonProviderService) => {
    expect(service).toBeTruthy();
  }));
});
