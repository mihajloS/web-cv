import { TestBed } from '@angular/core/testing';

import { ContactCommService } from './contact-comm.service';

describe('ContactCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactCommService = TestBed.get(ContactCommService);
    expect(service).toBeTruthy();
  });
});
